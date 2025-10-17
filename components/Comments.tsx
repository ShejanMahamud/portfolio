'use client'

import Giscus from '@giscus/react';

export default function Comments() {
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
                theme="dark"
                lang="en"
                loading="lazy"
            />
        </div>
    )
}
