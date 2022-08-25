Heat_waves_song="";
born_for_this_theme_song="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_Heat_waves = "";
song_born_for_this_theme = "";

function setup(){
    canvas = createCanvas(500,450);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    Heat_waves_song = loadSound("hw.mp3");
    born_for_this_theme_song = loadSound("bft.mp3");
}

function draw(){
    image(video,0,0,500,450);

    fill("#00ff00");
    stroke("#ff0000");

    song_Heat_waves = Heat_waves_song.isPlaying();
    console.log(song_Heat_waves);

    song_born_for_this_theme = born_for_this_theme_song.isPlaying();
    console.log(song_born_for_this_theme);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        born_for_this_theme_song.stop();
        if(song_Heat_waves == false){
            Heat_waves_song.play();
        }
        else{
            console.log("Song Name: Heat waves Song");
            document.getElementById("song_id").innerHTML = "Song Name: Heat waves Song";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        Heat_waves_song.stop();
        if(song_born_for_this_theme == false){
            born_for_this_theme_song.play();
        }
        else{
            console.log("Song Name: Born For This Theme Song");
            document.getElementById("song_id").innerHTML = "Song Name: Born For This Song";
        }
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}