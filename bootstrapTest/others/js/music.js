/* 设置时间 */
let time=$(".player-time>.player-end"),
    nowTime=$(".player-time>.player-start"),
    progress=$(".player-time>.player-progress"),
    progressNow=progress.find(".player-progress-now"),
    progressWidth=parseInt(progress.css("width")),
    IsPC=function () {
    let userAgentInfo = navigator.userAgent;
    let Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", 
    "iPod"];    //常用的手机系统版本
    let flag = true;    //建立标志
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;    //如果是手机版本返回false
            break;
        }
    }
    return flag;
    }
IsPC=IsPC();
if(!IsPC){
    $("<link>").attr({ rel: "stylesheet",type: "text/css",href: "./css/mobie.css"
    }).appendTo("head");
}
let player,
    control=$(".player-controls"),
    isStop=true,
    isNoSound=false,
    timer=null,
    corverImg=$('.player-corver>img'),
    pause=control.find(".player-controls-pause"),
    isRun=false,
    nowSong=0,
    searchUl=$("#player-search .player-search-searchList"),
    songsList=[],
    songsListInfo=$(".songsListInfo");;
soundManager.setup({  
    onready: function() {  
        player=soundManager.createSound({  
            id: 'player',  
            autoLoad: true,  
            autoPlay: true,  
            url:""
        });  
        if(localStorage.getItem("songsList")){
            songsList=JSON.parse(localStorage.getItem("songsList"));
            loadSongList(songsList);
            createLi(songsList);
        }else{
            console.log("初始化");
            getSongList(2029258023);
        }
    },
    error:function(){
        console.log("错了！")
    }
});

if(!IsPC){
    console.log("mobie");
    progress.on("touchstart",function(e){
        alert("手机端进度条有BUG！");
        /* if(player.playState==0){
            alert("请先播放");
        }else{
            let ex=parseInt(e.originalEvent.changedTouches[0].clientX-25),
                wid=ex/parseInt(progress.css("width"));
            if(wid>player.bytesLoaded||wid>0.9){
                alert("选择的进度在加载");
            }else{
                let time=Math.floor(wid*playTime);
                let p=Math.floor(ex/progressWidth*playTime);
                player.setPosition(p);
                setTimeText();
            }
        } */
    });
    pause.on("click",function(){
        if(isStop){
            $(this).removeClass("player-controls-start");
            console.log(player)
            player.play();
            timer=setInterval(setTimeText,1000);
            isRun=true;
        }else{
            $(this).addClass("player-controls-start");
            player.pause();
            clearInterval(timer);
            isRun=false;
        }
        isStop=!isStop;
    });
    let choose=preOrnext;
    /* 上一首下一首 */
    control.find(".player-controls-pre").on("click",function(){
        choose(1)
    });
    control.find(".player-controls-next").on("click",function(){
        choose(0)
    });
    function preOrnext(i){
        choose=function(){
            alert("请勿频繁点击");
        };
        setTimeout(function(){
            choose=preOrnext;
        },1000);
        if(i){
            if(--nowSong<0){
                alert("没有上一首了");
                nowSong++;
                return;
            }
        }else{
            console.log("结束了")
            if(++nowSong>songsList.length-1){
                alert("没有下一首了");
                nowSong--;
                return;
            }
        }
        player.pause();
        player=null;
        player=soundManager.createSound({
            id: 'player',  
            autoLoad: true,  
            autoPlay: false,  
            url:"http://music.163.com/song/media/outer/url?id="+songsList[nowSong].id+".mp3"
        });
        isStop=true;
        setTimeText();
        setSong(nowSong);
        pause.click();
    }
}else{
    console.log("pc")
    progress.on("click",function(e){
        if(player.playState==0){
            alert("请先播放");
        }else{
            let wid=e.offsetX/progressWidth;
            if(wid>Math.floor(player.bytesLoaded*100)/100){
                alert("选择的进度在加载");
            }else{
                let time=Math.floor(wid*playTime);
                player.setPosition(Math.floor(e.offsetX/progressWidth*playTime));
                setTimeText();
            }
        }
    });
    pause.on("click",function(){
        onlyPlayOne=function(){};
        ikk=null;
        if(isStop){
            $(this).removeClass("player-controls-start");
            soundManager.play('player',{
                onfinish:function(){
                    setTimeText();
                    console.log("结束了1")
                    control.find(".player-controls-next").click();
                },
                error:function(code,dis){
                    console.log(code,dis)
                }
            });
            timer=setInterval(setTimeText,1000);
            isRun=true;
        }else{
            $(this).addClass("player-controls-start");
            player.pause();
            clearInterval(timer);
            isRun=false;
        }
        isStop=!isStop;
    });
    /* 暂停开始事件 采用setTimeout完成队列防止多次使用 */
    let onlyPlayOne=null,
        playerOn=function(){
            pause.click();
        },
        ikk=null;
    /* 上一首下一首 */
    control.find(".player-controls-pre").on("click",function(){
        if(--nowSong<0){
            alert("没有上一首了");
            nowSong++;
            return;
        }
        preOrnext();
    });
    control.find(".player-controls-next").on("click",function(){
        console.log("结束了")
        if(++nowSong>songsList.length-1){
            alert("没有下一首了");
            nowSong--;
            return;
        }
        preOrnext();
    });
    function preOrnext(){
        isStop=true;
        setTimeText();
        onlyPlayOne=playerOn;
        setSong(nowSong);
        if(ikk)clearTimeout(ikk);
        ikk=setTimeout(function(){
            onlyPlayOne();
        },500);
    }
}
/* 声音事件 */
let icon=control.find('.player-sound-icon');
control.find(".player-controls-sound").on("click",function(e){
    let sound=parseInt(control.find('.player-sound-volume').width());
    if(e.target!=this){
        if(e.target!=icon[0]){
            let x=e.offsetX;
            $(this).find('.player-sound-now').css("width",x+"px");
            if(x<sound/2){
                icon.removeClass("player-sound-icon-mustsound");
                icon.addClass("player-sound-icon-moresound");   
            }else{
                icon.addClass("player-sound-icon-mustsound");  
            }
            player.setVolume(Math.round(x/sound*100));
        }else{
            if(!isNoSound){
                player.setVolume(0);
                $(this).find('.player-sound-now').css("width","0px");
                icon.removeClass("player-sound-icon-moresound");
                icon.removeClass("player-sound-icon-mustsound");
                icon.addClass("player-sound-icon-nosound");   
            }else{
                player.setVolume(100);
                $(this).find('.player-sound-now').css("width",sound+"px");
                icon.addClass("player-sound-icon-mustsound");  
            }
            isNoSound=!isNoSound;
        }
    }
}) 
//ajax接受歌曲信息
let songInfo=$(".player-info").children(),
    songCorver=$(".player-corver>img");
function getSongById(id,isSearch){
    $.ajax({    
        url: 'http://query.yahooapis.com/v1/public/yql',    
        dataType: 'jsonp',    
        data: {    
            q: `select * from json where url=\"http://music.163.com/api/song/detail/?id=${id}&ids=%5B${id}%5D\"`,    
            format: "json"    
        },    
        success: function (data) {
            let song=JSON.parse(JSON.stringify(data)).query.results["json"];
            if(song.code==200){
                let info=song.songs;
                if(isSearch){
                    if(info&&info.name!="null"){
                        searchList.push(info);
                        console.log(searchList);
                        searchLi();
                    }else{
                        alert("没有查询到相关歌曲");
                        console.log("没有查询到相关歌曲");
                    }
                    searchLoad.addClass("list-load-none");
                }else{
                    if(info){
                        songsList.push(info);
                    }else{
                        alert("该歌曲付费 暂时不能听");
                    } 
                }    
            }else{
                alert("服务器繁忙 请稍后再试");
                console.log("服务器繁忙");
            }
        },
        error:function(error){
            if(isSearch){
                searchLoad.addClass("list-load-none");
            }
            alert("加载失败 1.请确定歌曲是否存在2.雅虎抽风了");
        },
        timeout:15000   
    });  
}
/* 获得歌单列表 */
function getSongList(id,isSearch){
    $.ajax({    
        url: 'http://query.yahooapis.com/v1/public/yql',    
        dataType: 'jsonp',    
        data: {    
            q: `select * from json where url=\"http://music.163.com/api/playlist/detail?id=${id}&updateTime=-1\"`,   
            format: "json"    
        },    
        success: function (data) { 
            let result=JSON.parse(JSON.stringify(data)).query.results["json"];
            if(result.code==200){
                if(isSearch){
                    searchList.push(result.result);
                    console.log(searchList);
                    searchLi(true);
                }else{
                    songsList=result.result.tracks;
                    console.log(songsList);
                    loadSongList(songsList);
                    createLi(songsList);
                }
                searchLoad.addClass("list-load-none");
                localStorage.setItem('songsList', JSON.stringify(songsList));
            }else{
                alert("查找失败 请确定输入的歌单是否存在");
                console.log("查找失败");
                searchLoad.addClass("list-load-none");
            }
        },
        error:function(error){
            alert("雅虎抽风了 请稍后再试");
            if(isSearch){
                searchLoad.addClass("list-load-none");
            }
        }
    });
}
/* 设置歌曲信息 */
function setSong(num){
    let playerSong=songsList[num];
    if(playerSong){
        changeInfo(playerSong,num);
    }else{
        alert("歌曲出错啦");
    }
}
/* 更改歌曲信息 */
let playTime=0;
function changeInfo(playerSong){
    console.log("切歌",playerSong);
    songCorver.attr("src",playerSong["album"].picUrl+"?param=200y200");
    songInfo[0].innerText=playerSong.name;
    songInfo[2].innerText=playerSong["album"].name;
    playTime=parseInt(playerSong.lMusic.playTime);
    time.text(getTime(playTime/1000));
    let singers=playerSong["artists"];
    songInfo[1].innerText=getSingerNames(singers);
    //soundManager.load({url:`http://music.163.com/song/media/outer/url?id=${playerSong.id}.mp3`});
    player.load({url:`http://music.163.com/song/media/outer/url?id=${playerSong.id}.mp3`});
} 
function getSingerNames(singers){
    let singersName=null;
    if(singers instanceof Array){
        let arr=[];
        singers.forEach(function(singer){
            arr.push(singer.name);
        });
        singersName=arr.join("\/");
    }else{
        singersName=singers.name;
    }
    return singersName;
}
/* 播放时间00:00变化 */
let nexx=nextOne;
let swapsong=songCantPlay;
let setTimeText=function(){
    nowTime.text(getTime(Math.floor(player.position/1000)));
    progressNow.css("width",(parseInt(player.position)/playTime*100).toFixed(0)+"%");
    /* if(player.readyState==2){
        swapsong();
     }  */
    if(player.position+1500>playTime){
        nexx();
        player.setPosition(0);
    }
}

function nextOne(){
    nexx=function(){}
    player.setPosition(1);
    pause.addClass("player-controls-start");
    player.pause();
    console.log("end");
    isStop=false;
    isRun=false;
    nowSong++;
    setTimeText();
    setSong(nowSong);
    setTimeout(function(){
        nexx=nextOne;
    },5000);
}
/* 歌曲不能听的情况下 下一首 */
function songCantPlay(){
    swapsong=function(){}
    alert("该歌曲已下架或付费专属");
    songsList.splice(nowSong,1);
    ul.children().eq(nowSong).remove();
    if(nowSong>songsList.length-1){
        nowSong--;
    }
    changeInfo(songsList[nowSong]);
    localStorage.setItem('songsList', JSON.stringify(songsList));
    isStop=true;
    pause.click();
    swapsong=songCantPlay;
}
/* 销毁初始化加载动画 */
let loadHidden=function(){
    $(".load").animate({
        opacity:0
    },1000,function(){
        $(this).css("display","none"); 
    });
    loadHidden=null;
}
/* 第一次加载完成的事件 */
let loadSongList=function(songsList){
    setSong(nowSong);
    loadHidden();
    timer=setInterval(setTimeText,1000);
}
let ul=$("#player-list>.player-list-songsList");
/* 
    右上角的图标点击          
 */
let playerToggle=$(".player-toggle"),
    search=$('#player-search');
(function(){
    playerToggle.find(".player-list-icon").on("click",function(e){
        $('#player-list').css("left",0);
        e.stopPropagation();
    });
    playerToggle.find(".player-search-icon").on("click",function(e){
        search.toggleClass("card-rotate");
        $('#player').toggleClass("card-rotate");
        e.stopPropagation();
    });
    $("#player-list>.player-list-title>.player-icon-back").on("click",function(e){
        $('#player-list').css("left","100%");
        e.stopPropagation();
    });
    search.find(".player-icon-back").on("click",function(){
        search.toggleClass("card-rotate");
        $('#player').toggleClass("card-rotate");
    });
})();
let searchList=[],
    info="",
    searchLoad=$("#player-search>.player-search-container>.list-load-container");
search.find(".player-search-button").on("click",function(e){
    info=search.find("#searchContent").val().trim();
    if(info==""){
        alert("请输入内容");
    }else{
        let depend=search.find('input[name="search"]:checked ').val();
        searchList=[];
        searchLoad.removeClass("list-load-none");
        searchUl.children().remove();
        switch(depend){
            case "1":
                getSongById(info,true);
                break;
            case "2":
                getSongList(info,true);
                break;
            case "3":
                alert("暂不支持");
                break; 
        }
    }
    e.stopPropagation();
});
ul.on("click",function(e){
    let me=$(e.target);
    let info=me.parent();
    if(me.attr("removeMe")){
        removeLi(me,info);
        let id=info.attr("songid");
        for(i in songsList){
            if(songsList[i].id==id){
                songsList.splice(i,1);
                localStorage.setItem('songsList', JSON.stringify(songsList));
                if(i==nowSong){
                    if(nowSong<songsList.length-1){
                        nowSong--;
                        control.find(".player-controls-next").click();
                    }else{
                        control.find(".player-controls-pre").click();
                    }
                }
                return;
            }
        }
        return;
    };
    if(info.attr("songid")){
        let songid=info.attr("songid");
        for(let i in songsList){
            if(songsList[i].id==songid){
                player=soundManager.createSound({
                    id: 'player',  
                    autoLoad: true,  
                    autoPlay: false,  
                    url:"http://music.163.com/song/media/outer/url?id="+songsList[i].id+".mp3"
                });
                isStop=true;
                nowSong=i;
                setSong(i);
                setTimeout(function(){
                    pause.click();
                },500);
                $('#player-list').css("left","100%");
                return ;
            }
        }
        return ;
    }
    if(info.attr("singerid")){
        alert("暂不支持搜索歌手");
        console.log("singer");
        return ;
    }       
});
/* 搜索列表 搜歌名ID */
function searchSong(event,_this){
    let e=$(event.target);
    if(e.attr("add")){
        let have=false;
        console.log(songsList);
        songsList.forEach(function(song){
            if(song.id==searchList[0].id){
                console.log("已经有这首歌了");
                alert("已经有这首歌了");
                have=true;
                return;
            }
        })
        if(have)return;
        songsList.push(searchList[0]);
        appendLi(searchList[0]);
        let __this=$(_this);
        searchAnimate(e,__this);
        localStorage.setItem('songsList', JSON.stringify(songsList));
    }
}
/* 搜索列表 搜歌单ID */
function searchSongsList(event,_this){
    let e=$(event.target),
        __this=$(_this);
    if(e.attr("add")){
        mysongs=searchList[0].tracks;
        let arr=songsList,
            obj={},
            potype;
        for(let i=0;songsList[i]!=null;i++){
            potype="a"+songsList[i].id;
            if(!obj[potype]){
                obj[potype]=true;
            }
        }
        for(let i=0;mysongs[i]!=null;i++){
            potype="a"+mysongs[i].id;
            if(!obj[potype]){
                obj[potype]=true;
                arr.push(mysongs[i]);
            }
        }
        createLi(arr);
        arr=null;
        obj=null;
        potype=null;
        searchAnimate(e,__this);
    }else if(e.attr("replace")){
        songsList=searchList[0].tracks;
        ul.children().remove();
        setSong(0);
        createLi(songsList);
        searchAnimate(e,__this);
    }
    localStorage.setItem('songsList', JSON.stringify(songsList));
}
/* 搜索列表 动画 */
function searchAnimate(e,__this){
    console.log("ani");
    e.animate({aa:"360"},{
        step:function(now,fx){
            e.css({"transform":"rotate("+now+"deg)"});
        },
        duration:300,
    });
    setTimeout(function(){
        __this.animate({
            "left":"-580px",
        },300,function(){
            __this.remove();
        }).queue();
    },300);
}
/* 播放列表删除动画 */
function removeLi(me,info){
    me.addClass("player-rotate90");
    setTimeout(function(){
        info.addClass("list-remove");
        setTimeout(function(){
            info.remove();
        },450)
    },200);
}
let corverAnimate=null,corverDeg=0;
/* 封面旋转 */
function corverRun(){
    if(isRun){
        if(corverDeg==360)corverDeg=0;
        corverImg.css("transform","rotate("+(corverDeg++)+"deg)");
        runtime=corverAnimate;
    }
    corverAnimate=requestAnimationFrame(corverRun);
}
corverRun();
/* 时间转换 */
function getTime(s) {
    let t="";
    if(s > -1){
        let min = Math.floor(s/60) % 60;
        let sec = s % 60;
        if(min < 10){t += "0";}
        t += min + ":";
        if(sec < 10){t += "0";}
        t += sec.toFixed(0);
    }
    return t;
}
/* 初始化播放列表 */
function createLi(songsList){
    let str="";
    let id,name,singerName,playTime;
    songsList.forEach(function(song){
        id=song.id,
        name=song.name,
        singerId=song["artists"].id,
        singerName=getSingerNames(song["artists"]),
        playTime=getTime(song.lMusic.playTime/1000);
        str+=`<li songId="${id}"><div class="player-list-song" songId="${id}"><span title="${name}">${name}</span></div>
        <div class="player-list-singer" singerId="${singerId}"><span title="${singerName}">${singerName}</span></div>
        <div class="player-list-playtime" songId="${id}" ><span title="${playTime}">${playTime}</span>
        </div><div removeMe="true" class="player-list-remove"></div></li>`;
    });
    ul.append(str);
}
/* 搜索列表 */
function searchLi(isList=false,start=0,end=searchList.length){
    let str="",song=null;
    if(isList){
        let id,name,trackCount;
        for(let i=start;i<end;i++){
            song=searchList[i];
            id=song.id;
            name=song.name;
            trackCount=song.trackCount;
            console.log(song);
            str+=`<li onclick="searchSongsList(event,this)" songId="${id}"><div class="player-list-song" songsId="${id}"><span title="${name}">${name}</span></div>
            <div class="player-list-count"><span title="${trackCount}首歌">${trackCount}首</span></div>
            <div replace="true" class="player-search-replace"></div><div add="true" class="player-search-add"></div></li>`;
        }
    }else{
        let id,name,singerName,playTime;
        for(let i=start;i<end;i++){
            console.log("i",i)
            song=searchList[i];
            id=song.id,
            name=song.name,
            singerId=song["artists"].id,
            singerName=getSingerNames(song["artists"]),
            str+=`<li onclick="searchSong(event,this)" songId="${id}"><div class="player-list-song" songId="${id}"><span title="${name}">${name}</span></div>
            <div class="player-list-singer" singerId="${singerId}"><span title="${singerName}">${singerName}</span></div>
            <div add="true" class="player-search-add"  style="margin-left:2rem;"></div></li>`;
        }
    }
    searchUl.append(str);
}
/* 播放列表添加新项 */
function appendLi(song){
    let str="";
    let id=song.id,
        name=song.name,
        singerId=song["artists"].id,
        singerName=getSingerNames(song["artists"]),
        playTime=getTime(song.lMusic.playTime/1000);
        str+=`<li songId="${id}"><div class="player-list-song" songId="${id}"><span title="${name}">${name}</span></div>
        <div class="player-list-singer" singerId="${singerId}"><span title="${singerName}">${singerName}</span></div>
        <div class="player-list-playtime" songId="${id}" ><span title="${playTime}">${playTime}</span>
        </div><div removeMe="true" class="player-list-remove"></div></li>`;
        ul.append(str);
}