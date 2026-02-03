function WorkInProgress() {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
            {/* Cambia "./images/work.png" por "/images/work.png" */}
            <img 
                src="/images/work.png" 
                alt="Work In Progress Icon@clipartmax.com" 
                style={{ maxWidth: "100%", height: "auto" }}
            /> 
        </div>
    );
}

export default WorkInProgress;