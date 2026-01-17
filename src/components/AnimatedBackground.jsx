import { motion } from 'framer-motion';
import { FaReact, FaPython, FaNodeJs, FaAws, FaDocker, FaDatabase, FaCode, FaCloud, FaServer, FaLaptopCode } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiTailwindcss, SiPostgresql, SiMongodb } from 'react-icons/si';

const icons = [
    { Icon: FaReact, color: '#61DAFB' },
    { Icon: FaPython, color: '#3776AB' },
    { Icon: FaNodeJs, color: '#339933' },
    { Icon: SiJavascript, color: '#F7DF1E' },
    { Icon: SiTypescript, color: '#3178C6' },
    { Icon: FaAws, color: '#FF9900' },
    { Icon: FaDocker, color: '#2496ED' },
    { Icon: FaDatabase, color: '#aaaaaa' },
    { Icon: FaCloud, color: '#ffffff' },
    { Icon: FaServer, color: '#999999' },
    { Icon: SiTailwindcss, color: '#06B6D4' },
    { Icon: SiPostgresql, color: '#4169E1' },
    { Icon: SiMongodb, color: '#47A248' },
    { Icon: FaCode, color: '#ffffff' },
    { Icon: FaLaptopCode, color: '#ffffff' },
];

const AnimatedBackground = () => {
    // Generate random positions and animation parameters for a set of background icons
    const backgroundIcons = Array.from({ length: 20 }).map((_, i) => {
        const iconData = icons[i % icons.length];
        return {
            id: i,
            Icon: iconData.Icon,
            color: iconData.color,
            initialX: Math.random() * 100, // percentage
            initialY: Math.random() * 100, // percentage
            duration: 20 + Math.random() * 20, // 20-40s duration
            delay: Math.random() * 5,
            scale: 0.5 + Math.random() * 1, // 0.5x to 1.5x scale
        };
    });

    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-dark-950/90 z-0"></div>

            {/* Floating Icons */}
            {backgroundIcons.map((item) => (
                <motion.div
                    key={item.id}
                    className="absolute z-0 opacity-[0.03]"
                    style={{
                        left: `${item.initialX}%`,
                        top: `${item.initialY}%`,
                        color: item.color,
                    }}
                    animate={{
                        y: [0, -50, 0],
                        x: [0, 30, 0],
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: item.duration,
                        repeat: Infinity,
                        delay: item.delay,
                        ease: "linear",
                    }}
                >
                    <item.Icon size={`${item.scale * 3}rem`} />
                </motion.div>
            ))}
        </div>
    );
};

export default AnimatedBackground;
