import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode
    className?: string
    containerClassName?: string
    id?: string
}

export function Section({ children, className, containerClassName, id, ...props }: SectionProps) {
    return (
        <section
            id={id}
            className={cn("py-16 md:py-24", className)}
            {...props}
        >
            <div className={cn("container mx-auto px-4 md:px-6", containerClassName)}>
                {children}
            </div>
        </section>
    )
}
