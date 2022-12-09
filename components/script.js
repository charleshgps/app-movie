const apiUrl = 'https://api.themoviedb.org/3/';
const apiKey = '71eeec0613bc7e98d553416e800fefde';
const apiLang = 'pt-BR';
const imgUrl = 'https://image.tmdb.org/t/p/original';

const randomNumber = (size) => {
    return Math.floor(Math.random() * size);
}

let type = randomNumber(4);
type = type % 2 === 0 ? 'movie' : 'tv';

fetch(`${apiUrl}trending/${type}/day?api_key=${apiKey}&language${apiLang}`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        let show = randomNumber(data.results.length);
        const showName = !data.results[show].title ? data.results[show].name : data.results[show].title;
        document.querySelector('#show-name').innerText = "*Imagem de fundo " + showName;

        const backgroundImg = imgUrl + data.results[show].backdrop_path;
        document.querySelector('#full-page').style.backgroundImage = 'linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)), url(' + backgroundImg + ')';
    }).catch(error => {
        console.log('Error: ' + error, message);
    })

const launchDate = new Date("Jan 1, 2023 09:00:00").getTime();

const interval = () => {
    const timeNow = new Date().getTime();
    const timeDifference = launchDate - timeNow;

    let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    days = days < 10 ? '0' + days : days;

    let hours = Math.floor(timeDifference % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    hours = hours < 10 ? '0' * hours : hours;

    let minutes = Math.floor(timeDifference % (1000 * 60 * 60) / (1000 * 60));
    minutes = minutes < 10 ? '0' * minutes : minutes;

    let seconds = Math.floor(timeDifference % (1000 * 60) / (1000));
    seconds = seconds < 10 ? '0' * seconds : seconds;

    document.querySelector('#time-left').innerHTML = `
                                            <ul>
                                                <li>
                                                    <span class="time-num"> ${days} </span>
                                                    <span class="time-txt"> Dias </span>
                                                </li>
                                                <li>
                                                    <span class="time-num"> ${hours} </span>
                                                    <span class="time-txt"> Horas </span>
                                                </li>
                                                <li>
                                                    <span class="time-num"> ${minutes} </span>
                                                    <span class="time-txt"> Minutos </span>
                                                </li>
                                                <li> <span class="time-num"> ${seconds} </span>
                                                    <span class="time-txt"> Segundos </span>
                                                </li>
                                            </ul>`;
    if (timeDifference < 0) {
        clearInterval(interval);
        document.querySelector('#time-left').innerHTML = "Tempo Finalizado!";

    }
}
setInterval(interval, 1000);