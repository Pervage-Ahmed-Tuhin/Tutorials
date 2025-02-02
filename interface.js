var player = {
    currentSong: "",
    currentSongLength: 0,
    playNext: function () {
        console.log("Playing next song");
    },
    playPrevious: function () {
        console.log("Playing previous song");
    }
};
var AudioPlayer = /** @class */ (function () {
    function AudioPlayer(songInfo) {
        var _this = this;
        this.playNext = function () { return console.log("playing the song:" + _this.currentSong); };
        this.playPrevious = function () { return console.log("playing the song:" + _this.currentSong); };
        this.stopAudio = function () { return console.log("Audio stopped"); };
        this.currentSong = songInfo.name;
        this.currentSongLength = songInfo.length;
    }
    return AudioPlayer;
}());
//now using this class to make objects
var player1 = new AudioPlayer({ name: "song1", length: 3 });
var player2 = new AudioPlayer({ name: "song2", length: 4 });
// console.log(player1);
// console.log("\n");
// console.log(player2);
console.log(player1.playNext());
console.log(player1.currentSongLength);
console.log("\n");
console.log(player2.playNext());
console.log(player2.currentSongLength);
