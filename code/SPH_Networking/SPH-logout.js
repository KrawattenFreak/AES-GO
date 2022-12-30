export default function sphLogout(sessionID) {

    fetch('https://start.schulportal.hessen.de/index.php?logout=1',
        {
            method: 'GET',
            headers: {
                'Cookie': 'i=5220; sid=' + sessionID
            },
            credentials: 'omit'

        })
}