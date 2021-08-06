/* eslint-disable no-use-before-define */
/* 设置时间 */
let time = $(".player-time>.player-end");
let nowTime = $(".player-time>.player-start");
let progress = $(".player-time>.player-progress");
let progressNow = progress.find(".player-progress-now");
let progressWidth = parseInt(progress.css("width"));
var option = {}
var options = location.search.slice(1).split('&')
options.forEach(function(o) {
    var keys = o.split('=')
    option[keys[0]] = keys[1]
})
/**
 * 
 */
var music = [{
    name: 'ac说爱你.mp3',
    cover: './cover.jpg'
}, {
    name: '东西.mp3',
    cover: './cover.jpg'
}, {
    name: '狂徒.mp3',
    cover: './cover.jpg',
    singer:  '司霁&绛紫长酱紫的绛紫'
}, {
    name: '穿越少女.mp3',
    cover: './cover.jpg'
}, {
    name: '夺命桃花.mp3',
    cover: './cover.jpg'
}, {
    name: '世界第一笨蛋.mp3',
    cover: './cover.jpg'
}, {
    name: '月亮船.mp3',
    cover: './cover.jpg'
}, {
    name: 'ACAC组曲.mp3',
    cover: './cover.jpg'
}, {
    name: 'Despacito.mp3',
    cover: './cover.jpg'
}, {
    name: '拜无忧.mp3',
    cover: './cover.jpg'
}, {
    name: '彩虹猫.mp3',
    cover: './cover.jpg'
}, {
    name: '处处吻.mp3',
    cover: './cover.jpg'
}, {
    name: '登峰览古.mp3',
    cover: './cover.jpg'
}, {
    name: '牵丝戏.mp3',
    cover: './cover.jpg'
}, {
    name: '天生傲骨.mp3',
    cover: './cover.jpg'
}, {
    name: '万圣祭.mp3',
    cover: './cover.jpg'
}, {
    name: '为A而战.mp3',
    cover: './cover.jpg'
}, {
    name: '小酩酊.mp3',
    cover: './cover.jpg'
}, {
    name: '哑巴.mp3',
    cover: './cover.jpg'
}, {
    name: '异界契约.mp3',
    cover: './cover.jpg'
}, {
    name: 'Vtuber VS Vup - Rap Battle.mp3',
    cover: './cover.jpg'
}, {
    name: '呐呐呐.mp3',
    cover: './cover.jpg'
}]
let IsPC = function () {
    let userAgentInfo = navigator.userAgent;
    let Agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod"
    ]; // 常用的手机系统版本
    let flag = true; // 建立标志
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false; // 如果是手机版本返回false
            break;
        }
    }
    return flag;
}
IsPC = IsPC();
if (!IsPC) {
    $("<link>").attr({
        rel: "stylesheet",
        type: "text/css",
        href: "./css/mobie.css"
    })
        .appendTo("head");
}
let player;
let control = $(".player-controls");
let isStop = true;
let isNoSound = false;
let timer = null;
let corverImg = $('.player-corver>img');
let pause = control.find(".player-controls-pause");
let isRun = false;
let nowSong = option.song ? (Math.max(Math.min(option.song, music.length - 1), 0)) : 0;
let songsList = music;
soundManager.setup({
    onready: function () {
        player = soundManager.createSound({
            id: 'player',
            autoLoad: true,
            autoPlay: true,
            url: ""
        });
        getSongList();
    },
    error: function () {
        console.log("错了！")
    }
});

let choose = preOrnext;
if (!IsPC) {
    progress.on("touchstart", function (e) {
    });
    pause.on("click", function () {
        if (isStop) {
            $(this).removeClass("player-controls-start");
            console.log(player)
            player.play();
            timer = setInterval(setTimeText, 1000);
            isRun = true;
        } else {
            $(this).addClass("player-controls-start");
            player.pause();
            clearInterval(timer);
            isRun = false;
        }
        isStop = !isStop;
    });

    /* 上一首下一首 */
    control.find(".player-controls-pre").on("click", function () {
        choose(1)
    });
    control.find(".player-controls-next").on("click", function () {
        choose(0)
    });
 
} else {
    console.log("pc")
    progress.on("click", function (e) {
        if (player.playState == 0) {
            alert("请先播放");
        } else {
            let wid = e.offsetX / progressWidth;
            if (wid > Math.floor(player.bytesLoaded * 100) / 100) {
                alert("选择的进度在加载");
            } else {
                player.setPosition(Math.floor(e.offsetX / progressWidth * player.duration));
                setTimeText();
            }
        }

    });
    pause.on("click", function () {
        onlyPlayOne = function () { };
        ikk = null;
        if (isStop) {
            $(this).removeClass("player-controls-start");
            soundManager.play('player', {
                onfinish: function () {
                    setTimeText();
                    console.log("结束了1")
                    control.find(".player-controls-next").click();
                },
                error: function (code, dis) {
                    console.log(code, dis)
                }
            });
            timer = setInterval(setTimeText, 1000);
            isRun = true;
        } else {
            $(this).addClass("player-controls-start");
            player.pause();
            clearInterval(timer);
            isRun = false;
        }
        isStop = !isStop;
    });

    /* 暂停开始事件 采用setTimeout完成队列防止多次使用 */
    let onlyPlayOne = null;
    let playerOn = function () {
        pause.click();
    };
    let ikk = null;

    /* 上一首下一首 */
    control.find(".player-controls-pre").on("click", function () {
        if (--nowSong < 0) {
            nowSong = songsList.length - 1;
        }
        preOrnext();
    });
    control.find(".player-controls-next").on("click", function () {
        console.log("结束了")
        if (++nowSong > songsList.length - 1) {
            nowSong = 0;
        }
        preOrnext();
    });
    function preOrnext() {
        isStop = true;
        setTimeText();
        onlyPlayOne = playerOn;
        setSong(nowSong);
        if (ikk) {
            clearTimeout(ikk);
        }
        ikk = setTimeout(function () {
            onlyPlayOne();
        }, 500);
    }
}

function preOrnext(i) {
    choose = function () {
        alert("请勿频繁点击");
    };
    setTimeout(function () {
        choose = preOrnext;
    }, 1000);
    if (i) {
        if (--nowSong < 0) {
            nowSong = songsList.length - 1
        }
    } else {
        if (++nowSong > songsList.length - 1) {
            nowSong = 0
        }
    }
    player.pause();
    player = null;
    player = soundManager.createSound({
        id: 'player',
        autoLoad: true,
        autoPlay: false,
        url: 'https://zyzcss.github.io/music/' + songsList[nowSong].name
    });
    isStop = true;
    setTimeText();
    setSong(nowSong);
    pause.click();
    player.play()
}

/* 声音事件 */
let icon = control.find('.player-sound-icon');
control.find(".player-controls-sound").on("click", function (e) {
    let sound = parseInt(control.find('.player-sound-volume').width());
    if (e.target != this) {
        if (e.target != icon[0]) {
            let x = e.offsetX;
            $(this).find('.player-sound-now')
                .css("width", x + "px");
            if (x < sound / 2) {
                icon.removeClass("player-sound-icon-mustsound");
                icon.addClass("player-sound-icon-moresound");
            } else {
                icon.addClass("player-sound-icon-mustsound");
            }
            player.setVolume(Math.round(x / sound * 100));
        } else {
            if (!isNoSound) {
                player.setVolume(0);
                $(this).find('.player-sound-now')
                    .css("width", "0px");
                icon.removeClass("player-sound-icon-moresound");
                icon.removeClass("player-sound-icon-mustsound");
                icon.addClass("player-sound-icon-nosound");
            } else {
                player.setVolume(100);
                $(this).find('.player-sound-now')
                    .css("width", sound + "px");
                icon.addClass("player-sound-icon-mustsound");
            }
            isNoSound = !isNoSound;
        }
    }
})
// ajax接受歌曲信息
let songInfo = $(".player-info").children();
let songCorver = $(".player-corver>img");

/* 获得歌单列表 */
function getSongList() {
    loadSongList(music);
    createLi(music);
    corverImg.attr('src', songsList[nowSong].cover)
}

/* 设置歌曲信息 */
function setSong(num) {
    let playerSong = songsList[num];
    if (playerSong) {
        changeInfo(playerSong, num);
    } else {
        alert("歌曲出错啦");
    }
}

/* 更改歌曲信息 */
function changeInfo(playerSong) {
    console.log("切歌", playerSong);
    var name = playerSong.name.slice(0, playerSong.name.length - 4)
    songInfo[0].innerText = name;
    songInfo[1].innerText = playerSong.singer || '绛紫长酱紫的绛紫'
    console.log('https://zyzcss.github.io/music/' + playerSong.name);
    player.load({ url: 'https://zyzcss.github.io/music/' + playerSong.name });
}


/* 播放时间00:00变化 */
let nexx = nextOne;
let setTimeText = function () {
    nowTime.text(getTime(Math.floor(player.position / 1000)));
    time.text(getTime(Math.floor(player.duration / 1000)))
    progressNow.css("width", (parseInt(player.position) / player.duration * 100).toFixed(0) + "%");
    if (player.position > player.duration) {
        if (!IsPC) {
            choose(0)
        } else {
            nexx();
            player.setPosition(0);
        }
    }
}

function nextOne() {
    nexx = function () { }
    player.setPosition(1);
    pause.addClass("player-controls-start");
    player.pause();
    console.log("end");
    isStop = false;
    isRun = false;
    nowSong++;
    setTimeText();
    if (nowSong == songsList.length) {
        nowSong = 0
    }
    setSong(nowSong);
    setTimeout(function () {
        nexx = nextOne;
    }, 5000);
}


/* 销毁初始化加载动画 */
let loadHidden = function () {
    $(".load").animate({
        opacity: 0
    }, 1000, function () {
        $(this).css("display", "none");
    });
    loadHidden = null;
}

/* 第一次加载完成的事件 */
let loadSongList = function (songsList) {
    setSong(nowSong);
    loadHidden();
    timer = setInterval(setTimeText, 1000);
}
let ul = $("#player-list>.player-list-songsList");

/*
    右上角的图标点击
 */
let playerToggle = $(".player-toggle");
let search = $('#player-search');
(function () {
    playerToggle.on("click", function (e) {
        $('#player-list').css("left", 0);
        e.stopPropagation();
    });
    $("#player-list>.player-list-title>.player-icon-back").on("click", function (e) {
        $('#player-list').css("left", "100%");
        e.stopPropagation();
    });
})();
ul.on("click", function (e) {
    let me = $(e.target);
    let info = me.parent();
    if (info.attr("songid")) {
        let songid = info.attr("songid");
        for (let i in songsList) {
            if (songsList[i].name == songid) {
                player = soundManager.createSound({
                    id: 'player',
                    autoLoad: true,
                    autoPlay: false,
                    url: 'https://zyzcss.github.io/music/' + songsList[i].name
                });
                isStop = true;
                nowSong = i;
                setSong(i);
                setTimeout(function () {
                    pause.click();
                }, 500);
                $('#player-list').css("left", "100%");
                return;
            }
        }
    }
});

let corverAnimate = null; let corverDeg = 0;

/* 封面旋转 */
function corverRun() {
    if (isRun) {
        if (corverDeg == 360) {
            corverDeg = 0;
        }
        corverImg.css("transform", "rotate(" + (corverDeg+=0.2) + "deg)");
        runtime = corverAnimate;
    }
    corverAnimate = requestAnimationFrame(corverRun);
}
corverRun();

/* 时间转换 */
function getTime(s) {
    let t = "";
    if (s > -1) {
        let min = Math.floor(s / 60) % 60;
        let sec = s % 60;
        if (min < 10) {
            t += "0";
        }
        t += min + ":";
        if (sec < 10) {
            t += "0";
        }
        t += sec.toFixed(0);
    }
    return t;
}

/* 初始化播放列表 */
function createLi(songsList) {
    let str = "";
    let id; let name; let singerName;
    songsList.forEach(function (song) {
        id = song.name,
            name =  song.name.slice(0, song.name.length - 4),
            singerName = song.singer || '绛紫长酱紫的绛紫'
            // <div removeMe="true" class="player-list-remove"></div>
        str += `<li songId="${id}"><div class="player-list-song" songId="${id}"><span title="${name}">${name}</span></div>
        <div class="player-list-singer"><span title="${singerName}">${singerName}</span></div>
        </div></li>`;
    });
    ul.append(str);
}
