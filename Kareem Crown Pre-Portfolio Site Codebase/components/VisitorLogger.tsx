'use client';

import { useEffect } from 'react';
import { logVisitor } from '@/utils/visitorFingerprint';

export function VisitorLogger() {
    useEffect(() => {
        logVisitor();
    }, []);

    return null;
}
