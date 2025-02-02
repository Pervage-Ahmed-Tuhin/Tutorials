interface Player {
    currentSong: string;
    currentSongLength: number;
    playNext: () => void;
    playPrevious: () => void;
}

const player: Player = {
    currentSong: "",
    currentSongLength: 0,
    playNext: () => {
        console.log("Playing next song");
    },
    playPrevious: () => {
        console.log("Playing previous song");
    }
}


//now using class to use the interface

type song = {
    name: string;
    length: number;
}

class AudioPlayer implements Player {
    currentSong: string;
    currentSongLength: number;
    constructor(songInfo: song) {
        this.currentSong = songInfo.name;
        this.currentSongLength = songInfo.length;
        
    }
    playNext = () => console.log("playing the song:" + this.currentSong);
    playPrevious = () => console.log("playing the song:" + this.currentSong);

    stopAudio = ()=>console.log("Audio stopped");


}

//now using this class to make objects

const player1 = new AudioPlayer({ name: "song1", length: 3 });
const player2 = new AudioPlayer({ name: "song2", length: 4 });

// console.log(player1);
// console.log("\n");
// console.log(player2);
console.log(player1.playNext());
console.log(player1.currentSongLength);
console.log("\n");
console.log(player2.playNext());
console.log(player2.currentSongLength);