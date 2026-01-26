export async function index(req, res) {
    const dayOfWeek = new Date().getDay()

    let timeOfWeekMessage = ''
    let timeToWhatMessage = ''

    if (dayOfWeek == 0 || dayOfWeek == 6) {
        timeOfWeekMessage = 'the weekend'
        timeToWhatMessage = 'have fun'
    } else {
        timeOfWeekMessage = 'a weekday'
        timeToWhatMessage = 'work hard'
    }

    res.render(
        'index.ejs',
        {
            timeOfWeek: timeOfWeekMessage,
            timeToWhat: timeToWhatMessage
        }
    )
}