
import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QrCodeProps {
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
  level?: string;
  includeMargin?: boolean;
}

const QrCode: React.FC<QrCodeProps> = ({
  value,
  size = 200,
  bgColor = '#FFFFFF',
  fgColor = '#000000',
  level = 'M',
  includeMargin = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        value || 'https://bybc.banking',
        {
          width: size,
          margin: includeMargin ? 4 : 0,
          color: {
            dark: fgColor,
            light: bgColor,
          },
          errorCorrectionLevel: level as any,
        },
        (error) => {
          if (error) console.error('Error generating QR Code:', error);
        }
      );
    }
  }, [value, size, bgColor, fgColor, level, includeMargin]);

  return <canvas ref={canvasRef} />;
};

export default QrCode;
