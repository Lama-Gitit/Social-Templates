import { motion, useReducedMotion, type Variants } from 'framer-motion';

const sqBackVariants: Variants = {
    rest: { rotate: -12 },
    hover: {
        rotate: [-12, -16, -12],
        transition: { duration: 0.8, ease: 'easeOut' },
    },
};

const sqFrontVariants: Variants = {
    rest: { rotate: 8 },
    hover: {
        rotate: [8, 12, 8],
        transition: { duration: 0.8, ease: 'easeOut' },
    },
};

const dotVariants: Variants = {
    rest: { scale: 1, opacity: 1 },
    hover: {
        scale: [1, 0.8, 1, 0.8, 1, 0.8, 1],
        opacity: [1, 0.2, 1, 0.2, 1, 0.2, 1],
        transition: { duration: 1.5, ease: 'easeInOut' },
    },
};

export function SocialFramesLogo() {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            aria-label="Social Frames"
            className="w-full"
            initial="rest"
            animate="rest"
            whileHover={reduceMotion ? undefined : 'hover'}
        >
            <svg
                className="w-full h-auto block overflow-visible"
                viewBox="0 0 500 200"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <mask id="social-frames-inner-mask">
                        <rect
                            x="110"
                            y="80"
                            width="40"
                            height="40"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="8"
                        />
                    </mask>
                </defs>

                <g>
                    <motion.rect
                        x="92"
                        y="42"
                        width="76"
                        height="116"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="6"
                        strokeLinecap="square"
                        style={{ transformOrigin: '130px 100px' }}
                        variants={sqBackVariants}
                    />
                    <motion.rect
                        x="72"
                        y="62"
                        width="116"
                        height="76"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="6"
                        strokeLinecap="square"
                        style={{ transformOrigin: '130px 100px' }}
                        variants={sqFrontVariants}
                    />
                    <rect
                        x="110"
                        y="80"
                        width="40"
                        height="40"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="4"
                        strokeDasharray="6,6"
                        mask="url(#social-frames-inner-mask)"
                    />
                </g>

                <g fontFamily="Montserrat, sans-serif" fontWeight={800} fontSize={52} fill="#ffffff">
                    <text x="240" y="90" letterSpacing="-0.02em">
                        SOCIAL
                    </text>
                    <text x="240" y="142" letterSpacing="-0.02em">
                        FRAMES
                    </text>
                    <motion.circle
                        cx="478"
                        cy="134"
                        r="8"
                        fill="hsl(var(--primary))"
                        style={{ transformOrigin: '478px 134px' }}
                        variants={dotVariants}
                    />
                </g>
            </svg>
        </motion.div>
    );
}
