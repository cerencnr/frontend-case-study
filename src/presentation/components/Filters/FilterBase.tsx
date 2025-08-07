interface FilterBaseProps {
    title: string;
    children: React.ReactNode
}

export default function FilterBase({ title, children }: FilterBaseProps) {
    return (
        <>
            <p className="mb-2 fw-bold">{title}</p>
            <div style={{background: "white", borderRadius: '5px', padding: '0.8rem', marginBottom: '1rem'}}>
                {children}
            </div>
        </>
    );
}