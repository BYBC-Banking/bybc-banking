-- Create accounts table for user bank accounts
CREATE TABLE public.accounts (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name text NOT NULL,
    type text NOT NULL CHECK (type IN ('personal', 'business', 'investment')),
    account_number text NOT NULL UNIQUE,
    balance decimal(15,2) NOT NULL DEFAULT 0.00,
    currency text NOT NULL DEFAULT 'ZAR',
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create beneficiaries table for saved recipients
CREATE TABLE public.beneficiaries (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name text NOT NULL,
    account_number text NOT NULL,
    bank_name text NOT NULL,
    phone_number text,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create transactions table for all financial transactions
CREATE TABLE public.transactions (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    account_id uuid NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
    type text NOT NULL CHECK (type IN ('income', 'expense', 'transfer_in', 'transfer_out')),
    amount decimal(15,2) NOT NULL,
    description text NOT NULL,
    merchant text,
    category text,
    reference_number text,
    status text NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create transfers table for money transfers between users
CREATE TABLE public.transfers (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    from_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    to_user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    from_account_id uuid NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
    to_account_id uuid REFERENCES public.accounts(id) ON DELETE CASCADE,
    amount decimal(15,2) NOT NULL,
    reference text,
    status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
    beneficiary_name text,
    beneficiary_account text,
    beneficiary_bank text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beneficiaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transfers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for accounts
CREATE POLICY "Users can view their own accounts" 
ON public.accounts FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own accounts" 
ON public.accounts FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own accounts" 
ON public.accounts FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for beneficiaries
CREATE POLICY "Users can view their own beneficiaries" 
ON public.beneficiaries FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own beneficiaries" 
ON public.beneficiaries FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own beneficiaries" 
ON public.beneficiaries FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own beneficiaries" 
ON public.beneficiaries FOR DELETE 
USING (auth.uid() = user_id);

-- RLS Policies for transactions
CREATE POLICY "Users can view transactions for their accounts" 
ON public.transactions FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM public.accounts 
        WHERE accounts.id = transactions.account_id 
        AND accounts.user_id = auth.uid()
    )
);

CREATE POLICY "Users can insert transactions for their accounts" 
ON public.transactions FOR INSERT 
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.accounts 
        WHERE accounts.id = transactions.account_id 
        AND accounts.user_id = auth.uid()
    )
);

-- RLS Policies for transfers
CREATE POLICY "Users can view their transfers" 
ON public.transfers FOR SELECT 
USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);

CREATE POLICY "Users can insert their own transfers" 
ON public.transfers FOR INSERT 
WITH CHECK (auth.uid() = from_user_id);

CREATE POLICY "Users can update their own transfers" 
ON public.transfers FOR UPDATE 
USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_accounts_updated_at
    BEFORE UPDATE ON public.accounts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_beneficiaries_updated_at
    BEFORE UPDATE ON public.beneficiaries
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at
    BEFORE UPDATE ON public.transactions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_transfers_updated_at
    BEFORE UPDATE ON public.transfers
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_accounts_user_id ON public.accounts(user_id);
CREATE INDEX idx_beneficiaries_user_id ON public.beneficiaries(user_id);
CREATE INDEX idx_transactions_account_id ON public.transactions(account_id);
CREATE INDEX idx_transactions_created_at ON public.transactions(created_at DESC);
CREATE INDEX idx_transfers_from_user_id ON public.transfers(from_user_id);
CREATE INDEX idx_transfers_to_user_id ON public.transfers(to_user_id);
CREATE INDEX idx_transfers_created_at ON public.transfers(created_at DESC);