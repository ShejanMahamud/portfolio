'use client'

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

export default function Comments() {
    const { theme } = useTheme();
    return (
        <div className="w-full mt-10">
            <Giscus

                id="comments"
                repo="ShejanMahamud/portfolio"
                repoId="R_kgDOQDK6bw"
                category="General"
                categoryId="DIC_kwDOQDK6b84Cwvt1"
                mapping="pathname"
                term="Welcome to my blog!"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme={theme === 'dark' ? 'dark' : 'light'}
                lang="en"
                loading="lazy"
            />
        </div>
    )
}
