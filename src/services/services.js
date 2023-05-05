export function pastService(item) {
    console.log(item)
    localStorage.setItem('calcs', item)
    return (
        <div>
            <div>
                <div>
                    {'data'}
                </div>
                <div>
                    {item}
                </div>
            </div>
        </div>
    )
}