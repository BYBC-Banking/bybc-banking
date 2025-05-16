
import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QrCodeProps {
  value: string;
  size?: number;
  level?: string;
  bgColor?: string;
  fgColor?: string;
}

const QrCodeComponent: React.FC<QrCodeProps> = ({
  value,
  size = 200,
  level = 'M',
  bgColor = '#ffffff',
  fgColor = '#000000'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        value,
        {
          width: size,
          margin: 2,
          errorCorrectionLevel: level as any,
          color: {
            dark: fgColor,
            light: bgColor
          }
        },
        (error) => {
          if (error) console.error('Error generating QR code:', error);
        }
      );
    }
  }, [value, size, level, bgColor, fgColor]);

  return <canvas ref={canvasRef} />;
};

export default QrCodeComponent;
