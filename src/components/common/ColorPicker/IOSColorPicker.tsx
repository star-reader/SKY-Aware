import React, { useEffect, useRef, useState } from 'react';
import './IOSColorPicker.scss';

export interface ColorPickerProps {
    value: string;
    onChange: (color: string) => void;
    onClose: () => void;
    system: 'ios' | 'macos';
}

interface HSV {
    h: number;
    s: number;
    v: number;
}

const rgbToHsv = (r: number, g: number, b: number): HSV => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    
    let h = 0;
    const s = max === 0 ? 0 : d / max;
    const v = max;

    if (max !== min) {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return { h: h * 360, s: s * 100, v: v * 100 };
};

const hsvToRgb = (h: number, s: number, v: number): string => {
    h /= 360;
    s /= 100;
    v /= 100;

    let r = 0, g = 0, b = 0;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0:
            r = v; g = t; b = p;
            break;
        case 1:
            r = q; g = v; b = p;
            break;
        case 2:
            r = p; g = v; b = t;
            break;
        case 3:
            r = p; g = q; b = v;
            break;
        case 4:
            r = t; g = p; b = v;
            break;
        case 5:
            r = v; g = p; b = q;
            break;
    }

    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
};

const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
};

export default function IOSColorPicker({ value, onChange, onClose, system }: ColorPickerProps) {
    const [hsv, setHsv] = useState<HSV>(() => {
        const { r, g, b } = hexToRgb(value);
        return rgbToHsv(r, g, b);
    });

    const colorPanelRef = useRef<HTMLDivElement>(null);
    const hueSliderRef = useRef<HTMLDivElement>(null);
    const [isDraggingHue, setIsDraggingHue] = useState(false);

    const handlePanelClick = (e: React.MouseEvent) => {
        if (!colorPanelRef.current) return;

        const rect = colorPanelRef.current.getBoundingClientRect();
        let s = ((e.clientX - rect.left) / rect.width) * 100;
        let v = ((rect.height - (e.clientY - rect.top)) / rect.height) * 100;

        s = Math.max(0, Math.min(100, s));
        v = Math.max(0, Math.min(100, v));

        setHsv(prev => ({ ...prev, s, v }));
        onChange(hsvToRgb(hsv.h, s, v));
    };

    const handleHueMouseDown = (e: React.MouseEvent) => {
        setIsDraggingHue(true);
        handleHueMove(e);
    };

    const handleHueMove = (e: React.MouseEvent | MouseEvent) => {
        if (!hueSliderRef.current || (!isDraggingHue && e.type !== 'mousedown')) return;

        const rect = hueSliderRef.current.getBoundingClientRect();
        let h = ((e.clientX - rect.left) / rect.width) * 360;
        h = Math.max(0, Math.min(360, h));

        setHsv(prev => ({ ...prev, h }));
        onChange(hsvToRgb(h, hsv.s, hsv.v));
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDraggingHue) handleHueMove(e);
        };

        const handleMouseUp = () => {
            setIsDraggingHue(false);
        };

        if (isDraggingHue) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDraggingHue, hsv]);

    return (
        <div className="ios-color-picker-overlay" onClick={onClose}>
            <div className="ios-color-picker" data-system={system} onClick={e => e.stopPropagation()}>
                <div className="ios-color-picker__panel-container">
                    <div
                        className="ios-color-picker__panel"
                        ref={colorPanelRef}
                        onClick={handlePanelClick}
                        style={{
                            backgroundColor: `hsl(${hsv.h}, 100%, 50%)`
                        }}
                    >
                        <div
                            className="ios-color-picker__panel-cursor"
                            style={{
                                left: `${hsv.s}%`,
                                bottom: `${hsv.v}%`,
                                backgroundColor: hsvToRgb(hsv.h, hsv.s, hsv.v)
                            }}
                        />
                    </div>

                    <div
                        className="ios-color-picker__hue-slider"
                        ref={hueSliderRef}
                        onMouseDown={handleHueMouseDown}
                    >
                        <div
                            className="ios-color-picker__hue-cursor"
                            style={{ left: `${(hsv.h / 360) * 100}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}