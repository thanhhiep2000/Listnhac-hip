const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'MUSIC_PLAYER';

const main = $('.main');
const audio = $('#audio');
const songsList = $('.songs-list');
const cdThumb = $('.cd');
const cdImg = $('.cd-img');
const cdName = $('.cd-name');
const cdSinger = $('.cd-singer');
const cdPlaylist = $('.cd-playlist');

const playBtn = $$('.btn-play');
const nextBtns = $$('.btn-next');
const prevBtns = $$('.btn-prev');
const repeatBtns = $$('.btn-repeat');
const randomBtns = $$('.btn-random');
const volumeBtn = $('.volume-icon');


const progressList = $$('.progress');
const circles = $$('.circle');
const lineCurrents = $$('.line-current');


const progressVolume = $('.progress-volume');
const lineVolumeCurrent = $('.line-volume-current');
const circleVolume = $('.circle-volume')

const timeLefts = $$('.time-left');
const timeRights = $$('.time-right');
const timeTotal = $('.time-total');
const NodesList = $('.nodes-list');

// Mobile
const headingOnMobile = $('.heading-on-mobile');
const cdOnMobile = $('.cd-on-mobile');
const cdThumbOnMobile = $('.cd-thumb-on-mobile');
const mobileIconHide = $('.mobile-icon-hide');


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isMute: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    arrSongs: [],
    songs: [{
            name: 'Chúng ta của hiện tại',
            singer: 'Sơn Tùng M-TP',
            path: './assets/music/song1.mp3',
            image: './assets/imgs/thumbs/song1.jpg'
        },
        {

            name: '2AM',
            singer: 'JustaTee, Big Daddy',
            path: './assets/music/song2.mp3',
            image: './assets/imgs/thumbs/song2.png'
        },
        {

            name: 'vaicaunoicokhiennguoithaydoi',
            singer: 'GREY D',
            path: './assets/music/song3.mp3',
            image: './assets/imgs/thumbs/song3.jpg'
        },
        {

            name: 'Có hẹn với thanh xuân',
            singer: 'MONSTAR',
            path: './assets/music/song4.mp3',
            image: './assets/imgs/thumbs/song4.jpg'
        },
        {
            name: 'Ánh sao và bầu trời',
            singer: 'T.R.I, Cá',
            path: './assets/music/song5.mp3',
            image: './assets/imgs/thumbs/song5.jpg'
        },
        {

            name: 'Tệ thật, anh nhớ em',
            singer: 'Thanh Hưng',
            path: './assets/music/song6.mp3',
            image: './assets/imgs/thumbs/song6.jpg'
        },
        {
            name: 'Sợ rằng em biết anh còn yêu em',
            singer: 'Juun D',
            path: './assets/music/song7.mp3',
            image: './assets/imgs/thumbs/song7.jpg'
        },
        {
            name: 'Chỉ là muốn nói(300)',
            singer: 'Khải',
            path: './assets/music/song8.mp3',
            image: './assets/imgs/thumbs/song8.jpg'
        },
        {

            name: 'Thế Thôi(Thats all)',
            singer: 'Hai Sam',
            path: './assets/music/song9.mp3',
            image: './assets/imgs/thumbs/song9.jpg'
        },
        {

            name: 'Who?',
            singer: 'Chillies',
            path: './assets/music/song10.mp3',
            image: './assets/imgs/thumbs/song10.jpg'
        },
        {

            name: 'Forget Me Now',
            singer: 'Fishy, Trí Dũng',
            path: './assets/music/song11.mp3',
            image: './assets/imgs/thumbs/song11.jpg'
        },
        {

            name: 'Đừng quên tên anh',
            singer: 'Hoa Vinh',
            path: './assets/music/song12.mp3',
            image: './assets/imgs/thumbs/song12.jpg'
        },
        {

            name: 'Chạm kẽ tim anh một chút thôi',
            singer: 'Noo Phước Thịnh',
            path: './assets/music/song13.mp3',
            image: './assets/imgs/thumbs/song13.jpg'
        },
        {

            name: 'Tháng mấy em nhớ anh',
            singer: 'Hà Anh Tuấn',
            path: './assets/music/song14.mp3',
            image: './assets/imgs/thumbs/song14.jpg'
        },
        {

            name: 'Ms. May',
            singer: 'Chillies, Magazine',
            path: './assets/music/song15.mp3',
            image: './assets/imgs/thumbs/song15.jpg'
        },
        {

            name: 'Cho tôi tình yêu',
            singer: 'Denn',
            path: './assets/music/song16.mp3',
            image: './assets/imgs/thumbs/song16.jpg'
        },
        {

            name: 'Người yêu tôi lạnh lùng sắt đá',
            singer: 'MR. SIRO',
            path: './assets/music/song17.mp3',
            image: './assets/imgs/thumbs/song17.jpg'
        },
        {

            name: 'Răng khôn',
            singer: 'Phí Phương Anh, RIN9',
            path: './assets/music/song18.mp3',
            image: './assets/imgs/thumbs/song18.jpg'
        },
        {

            name: '#AiChoAi',
            singer: 'FloD, M!(Giang Nguyen)',
            path: './assets/music/song19.mp3',
            image: './assets/imgs/thumbs/song19.jpg'
        },
        {

            name: 'Tinh đắng như ly cà phê',
            singer: 'nân, Ngơ',
            path: './assets/music/song20.mp3',
            image: './assets/imgs/thumbs/song20.jpg'
        }

    ],
    render: function() {
        var htmls = this.songs.map(function(song, index) {
            return `<div class="song${app.currentIndex === index ? ' active' : ''} is-flex" data-index="${index}">
                            <div class="song-left is-flex">
                                <div class="thumb" data-index="${index}" style="background-image: url('${song.image}')!important">
                                    <i class="ri-play-fill icon-song-play"></i>
                                    <img src="./assets/imgs/icons/icon-playing.gif" alt="" class="gif-playing">
                                </div>
                                <div class="song-body">
                                    <h3 class="song-name">${song.name}</h3>
                                    <p class="song-singer">${song.singer}</p>
                                </div>
                            </div>
                            <div class="time-total time-total-${index}" >
                                <span>00:00</span>
                            </div>
                            <div class="song-option">
                                <i class="ri-heart-3-fill icon-heart"></i>
                                <i class="ri-more-fill icon-options"></i>
                            </div>
                        </div>`
        });
        songsList.innerHTML = htmls.join('');
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },
    handleEvents: function() {
        var lastValueVolume = 1;

        console.log(lastValueVolume)
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        });

        const cdPlaylistAnimate = cdPlaylist.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        });

        const cdOnMobileAnimate = cdOnMobile.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 20000,
            iterations: Infinity
        });

        cdThumbAnimate.pause();
        cdPlaylistAnimate.pause();
        cdOnMobileAnimate.pause();

        playBtn[0].onclick = PlayFunc;
        playBtn[1].onclick = PlayFunc;

        function PlayFunc() {
            if (app.isPlaying) {
                audio.pause();

            } else {
                audio.play();
            }

            // song play
            audio.onplay = function() {
                app.isPlaying = true;
                main.classList.add('is-playing');
                cdThumbAnimate.play();
                cdPlaylistAnimate.play();
                cdOnMobileAnimate.play();
                NodesList.classList.add('active');
            }

            // song pause
            audio.onpause = function() {
                app.isPlaying = false;
                main.classList.remove('is-playing');
                cdThumbAnimate.pause();
                cdPlaylistAnimate.pause();
                cdOnMobileAnimate.pause();
                NodesList.classList.remove('active');

            }

            // bài hát đang chạy
            audio.ontimeupdate = function() {
                if (audio.duration) {
                    const progressPercent = audio.currentTime / audio.duration * 100;
                    progressList[0].value = progressPercent;
                    progressList[1].value = progressPercent;
                    circles[0].style.left = `calc(${progressPercent}% - 4px)`;
                    circles[1].style.left = `calc(${progressPercent}% - 4px)`;
                    lineCurrents[0].style.width = progressPercent + '%';
                    lineCurrents[1].style.width = progressPercent + '%';

                    timeLefts[0].innerHTML = app.convertTime(audio.currentTime);
                    timeLefts[1].innerHTML = app.convertTime(audio.currentTime);
                }
            }

            // tua bài Hát
            progressList.forEach(function(progress) {
                progress.oninput = function() {
                    audio.currentTime = progress.value * audio.duration / 100;
                }
            })

            // Thay đổi âm lượng
            progressVolume.oninput = function() {
                audio.volume = progressVolume.value / 100;
                lineVolumeCurrent.style.width = audio.volume * 100 + '%';
                circleVolume.style.left = `calc(${audio.volume * 100}% - 4px)`;

                lastValueVolume = audio.volume;

                if (audio.volume === 0) {
                    volumeBtn.classList.toggle('mute', true);
                    app.isMute = true;
                } else {
                    volumeBtn.classList.toggle('mute', false);
                    app.isMute = false;
                }


            }

            //Khi kết thúc bài hát
            audio.onended = function() {
                if (app.isRepeat) {
                    audio.play();
                } else {
                    app.nextSong();
                    PlayFunc();
                    audio.play();
                    app.render();
                    app.scrollToActiveSong();
                    app.loadTotalTime();
                }
            }

            // Lắng nghe hành vi click vào playlist
            songsList.onclick = function(e) {
                const thumbEl = e.target.closest('.song:not(.active)');
                // const thumbEl = e.target.closest('.song:not(.active) .thumb');
                const optionEl = e.target.closest('.icon-options');
                const favariteEl = e.target.closest('.icon-heart');
                // console.log(thumbEl, optionEl, favariteEl);

                if (!optionEl && !favariteEl) {
                    if (thumbEl) {
                        app.currentIndex = Number(thumbEl.getAttribute('data-index'));
                        app.loadCurrentSong();
                        PlayFunc();
                        audio.play();
                        setTimeout(function() {
                            app.render();
                            app.loadTotalTime();
                        }, 100)

                    }
                }
                if (optionEl) {
                    alert('Nhạc hay thì xin 1 like ạ');
                }
            }
        }

        PlayFunc()

        nextBtns.forEach(function(nextBtn) {
            nextBtn.onclick = function() {
                app.nextSong();
                PlayFunc();
                audio.play();
                // app.render();
                app.scrollToActiveSong();
                // app.loadTotalTime();
                setTimeout(function() {
                    app.render();
                    app.loadTotalTime();
                }, 100)
            }
        })

        prevBtns.forEach(function(prevBtn) {
            prevBtn.onclick = function() {
                app.prevSong();
                PlayFunc();
                audio.play();
                app.render();
                app.loadTotalTime();
                setTimeout(function() {
                    app.render();
                    app.loadTotalTime();
                }, 100)
            }
        })

        randomBtns.forEach(function(randomBtn) {
            randomBtn.onclick = function() {
                app.isRandom = !app.isRandom;
                randomBtn.classList.toggle('active', app.isRandom);
                app.setConfig('isRandom', app.isRandom)
                console.log(app.isRandom);
            }
        })

        repeatBtns.forEach(function(repeatBtn) {
            repeatBtn.onclick = function() {
                app.isRepeat = !app.isRepeat;
                repeatBtn.classList.toggle('active', app.isRepeat);
                app.setConfig('isRepeat', app.isRepeat)
                console.log(app.isRepeat);
            }
        })


        volumeBtn.onclick = function() {
            if (app.isMute) {
                // app.setConfig('isMute', !app.isMute);
                audio.volume = lastValueVolume;
                lineVolumeCurrent.style.width = audio.volume * 100 + '%';
                circleVolume.style.left = `calc(${audio.volume * 100}% - 4px)`;
            } else {
                audio.volume = 0;
                // app.setConfig('isMute', !app.isMute);
                lineVolumeCurrent.style.width = audio.volume * 100 + '%';
                circleVolume.style.left = `calc(${audio.volume * 100}% - 4px)`;
            }
            volumeBtn.classList.toggle('mute', !app.isMute);
            app.isMute = !app.isMute;
        }
    },
    nextSong: function() {
        if (app.isRandom) {
            app.endRandomSong();
            app.playRandomSong();
        } else {
            app.currentIndex++;
            if (app.currentIndex >= app.songs.length) {
                app.currentIndex = 0;
            }
        }
        this.loadCurrentSong();

    },
    prevSong: function() {
        if (app.isRandom) {
            app.endRandomSong();
            app.playRandomSong();
        } else {
            app.currentIndex--;
            if (app.currentIndex < 0) {
                app.currentIndex = app.songs.length - 1;
            }
        }
        app.loadCurrentSong();
        this.loadTotalTime();

    },
    playRandomSong: function() {
        do {
            this.currentIndex = Math.floor(Math.random() * app.songs.length);
        } while (app.arrSongs.includes(this.currentIndex));
        this.loadCurrentSong();
    },
    convertTime: function(time) {
        var mins = Math.floor(time / 60);
        var secs = Math.floor(time % 60);
        if (mins < 10) {
            mins = '0' + mins;
        }
        if (secs < 10) {
            secs = '0' + secs;
        }
        return `${mins}:${secs}`;
    },
    loadCurrentSong: function() {
        cdName.innerHTML = this.currentSong.name;
        cdSinger.innerHTML = this.currentSong.singer;
        cdImg.src = this.currentSong.image;
        audio.src = this.currentSong.path;

        headingOnMobile.innerHTML = this.currentSong.name;
        cdThumbOnMobile.style.backgroundImage = `url('${this.currentSong.image}')`
        this.loadTimeRight();
    },
    loadTimeRight: function() {
        audio.onloadedmetadata = function() {
            timeRights[0].innerHTML = app.convertTime(audio.duration);
            timeRights[1].innerHTML = app.convertTime(audio.duration);
        }
    },
    loadTotalTime: function() {
        const listMusic = $$('.song');
        const lengthOfSongsList = listMusic.length;

        for (let i = 0; i < lengthOfSongsList; i++) {
            let audioFake = document.createElement('audio');
            audioFake.src = app.songs[i].path;
            audioFake.onloadedmetadata = function() {
                let totalTimeEl = listMusic[i].querySelector(`.time-total-${i} span`)
                console.log(audioFake.src, audioFake.duration, totalTimeEl)
                totalTimeEl.innerHTML = app.convertTime(audioFake.duration)
            }
        }

    },
    endRandomSong: function() {
        app.arrSongs.push(app.currentIndex);
        if (app.arrSongs.length === app.songs.length) {
            app.arrSongs = [];
        }
    },
    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 100)
    },
    loadConfig: function() {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
        // this.isMute = this.config.isMute;
        randomBtns[0].classList.toggle('active', app.isRandom);
        randomBtns[1].classList.toggle('active', app.isRandom);
        repeatBtns[0].classList.toggle('active', app.isRepeat);
        repeatBtns[1].classList.toggle('active', app.isRepeat);
        // volumeBtn.classList.toggle('mute', app.isMute);

    },
    toggleControlOnMobile: function() {
        mobileIconHide.onclick = function() {
            document.querySelector('.control-on-mobile').classList.remove('active');
        }

        cdImg.onclick = function() {
            document.querySelector('.control-on-mobile').classList.add('active');
        }

    },
    start: function() {
        // Gán cấu hình từ config vào app
        this.loadConfig();

        // Xử lý các sự kiện
        this.handleEvents();

        // Định nghĩa các thuộc tính cho object
        this.defineProperties();

        // Tải bài hát đầu tiên
        this.loadCurrentSong();

        //Render playlist
        this.render();

        // Tải total time
        this.loadTotalTime();

        // Đóng mở điều khiển ở mobile
        this.toggleControlOnMobile();
    }
}

app.start();