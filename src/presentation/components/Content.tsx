export default function Content({ children }: { children: React.ReactNode }) {
    return (
        <div className="home-container py-2"
             style={{height: 'calc(100% - 60px)', flexGrow: 1}}>
            <div className="container-fluid" style={{height: '100%'}}>
                <div className="row" style={{height: '100%'}}>
                    {children}
                </div>
            </div>
        </div>
    );
}
