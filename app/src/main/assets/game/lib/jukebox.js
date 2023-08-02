
this.jukebox = {};
jukebox.Player = function(b, c) {
    this.id = ++jukebox.__jukeboxId;
    this.origin = c || null;
    this.settings = {};
    for (var d in this.defaults) this.settings[d] = this.defaults[d];
    if ("[object Object]" === Object.prototype.toString.call(b))
        for (var f in b) this.settings[f] = b[f];
    "[object Function]" === Object.prototype.toString.call(jukebox.Manager) && (jukebox.Manager = new jukebox.Manager);
    this.resource = this.isPlaying = null;
    this.resource = "[object Object]" === Object.prototype.toString.call(jukebox.Manager) ? jukebox.Manager.getPlayableResource(this.settings.resources) :
        this.settings.resources[0] || null;
    if (null === this.resource) throw "Your browser can't playback the given resources - or you have missed to include jukebox.Manager";
    this.__init();
    return this
};
jukebox.__jukeboxId = 0;
jukebox.Player.prototype = {
    defaults: {
        resources: [],
        autoplay: !1,
        spritemap: {},
        flashMediaElement: "./swf/FlashMediaElement.swf",
        timeout: 1E3
    },
    __addToManager: function() {
        !0 !== this.__wasAddedToManager && (jukebox.Manager.add(this), this.__wasAddedToManager = !0)
    },
    __init: function() {
        var b = this,
            c = this.settings,
            d = {},
            f;
        jukebox.Manager && void 0 !== jukebox.Manager.features && (d = jukebox.Manager.features);
        if (!0 === d.html5audio) {
            this.context = new Audio;
            this.context.src = this.resource;
            if (null === this.origin) {
                var g = function(c) {
                    b.__addToManager(c)
                };
                this.context.addEventListener("canplaythrough", g, !0);
                window.setTimeout(function() {
                    b.context.removeEventListener("canplaythrough", g, !0);
                    g("timeout")
                }, c.timeout)
            }
            this.context.autobuffer = !0;
            this.context.preload = !0;
            for (f in this.HTML5API) this[f] = this.HTML5API[f];
            1 < d.channels ? !0 === c.autoplay ? this.context.autoplay = !0 : void 0 !== c.spritemap[c.autoplay] && this.play(c.autoplay) : 1 === d.channels && void 0 !== c.spritemap[c.autoplay] && (this.backgroundMusic = c.spritemap[c.autoplay], this.backgroundMusic.started = Date.now ?
                Date.now() : +new Date, this.play(c.autoplay));
            1 == d.channels && !0 !== c.canPlayBackground && (window.addEventListener("pagehide", function() {
                null !== b.isPlaying && (b.pause(), b.__wasAutoPaused = !0)
            }), window.addEventListener("pageshow", function() {
                b.__wasAutoPaused && (b.resume(), delete b._wasAutoPaused)
            }))
        } else if (!0 === d.flashaudio) {
            for (f in this.FLASHAPI) this[f] = this.FLASHAPI[f];
            d = ["id=jukebox-flashstream-" + this.id, "autoplay=" + c.autoplay, "file=" + window.encodeURIComponent(this.resource)];
            this.__initFlashContext(d);
            !0 === c.autoplay ? this.play(0) : c.spritemap[c.autoplay] && this.play(c.autoplay)
        } else throw "Your Browser does not support Flash Audio or HTML5 Audio.";
    },
    __initFlashContext: function(b) {
        var c, d = this.settings.flashMediaElement,
            f, g = {
                flashvars: b.join("&"),
                quality: "high",
                bgcolor: "#000000",
                wmode: "transparent",
                allowscriptaccess: "always",
                allowfullscreen: "true"
            };
        if (navigator.userAgent.match(/MSIE/)) {
            c = document.createElement("div");
            document.getElementsByTagName("body")[0].appendChild(c);
            var l = document.createElement("object");
            l.id = "jukebox-flashstream-" + this.id;
            l.setAttribute("type", "application/x-shockwave-flash");
            l.setAttribute("classid", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000");
            l.setAttribute("width", "0");
            l.setAttribute("height", "0");
            g.movie = d + "?x=" + (Date.now ? Date.now() : +new Date);
            g.flashvars = b.join("&amp;");
            for (f in g) b = document.createElement("param"), b.setAttribute("name", f), b.setAttribute("value", g[f]), l.appendChild(b);
            c.outerHTML = l.outerHTML;
            this.context = document.getElementById("jukebox-flashstream-" + this.id)
        } else {
            c =
                document.createElement("embed");
            c.id = "jukebox-flashstream-" + this.id;
            c.setAttribute("type", "application/x-shockwave-flash");
            c.setAttribute("width", "100");
            c.setAttribute("height", "100");
            g.play = !1;
            g.loop = !1;
            g.src = d + "?x=" + (Date.now ? Date.now() : +new Date);
            for (f in g) c.setAttribute(f, g[f]);
            document.getElementsByTagName("body")[0].appendChild(c);
            this.context = c
        }
    },
    backgroundHackForiOS: function() {
        if (void 0 !== this.backgroundMusic) {
            var b = Date.now ? Date.now() : +new Date;
            void 0 === this.backgroundMusic.started ? (this.backgroundMusic.started =
                b, this.setCurrentTime(this.backgroundMusic.start)) : (this.backgroundMusic.lastPointer = (b - this.backgroundMusic.started) / 1E3 % (this.backgroundMusic.end - this.backgroundMusic.start) + this.backgroundMusic.start, this.play(this.backgroundMusic.lastPointer))
        }
    },
    play: function(b, c) {
        if (null !== this.isPlaying && !0 !== c) void 0 !== jukebox.Manager && jukebox.Manager.addToQueue(b, this.id);
        else {
            var d = this.settings.spritemap,
                f;
            if (void 0 !== d[b]) f = d[b].start;
            else if ("number" === typeof b) {
                f = b;
                for (var g in d)
                    if (f >= d[g].start && f <=
                        d[g].end) {
                        b = g;
                        break
                    }
            }
            void 0 !== f && "[object Object]" === Object.prototype.toString.call(d[b]) && (this.isPlaying = this.settings.spritemap[b], this.context.play && this.context.play(), this.wasReady = this.setCurrentTime(f))
        }
    },
    stop: function() {
        this.__lastPosition = 0;
        this.isPlaying = null;
        this.backgroundMusic ? this.backgroundHackForiOS() : this.context.pause();
        return !0
    },
    pause: function() {
        this.isPlaying = null;
        this.__lastPosition = this.getCurrentTime();
        this.context.pause();
        return this.__lastPosition
    },
    resume: function(b) {
        b = "number" ===
            typeof b ? b : this.__lastPosition;
        if (null !== b) return this.play(b), this.__lastPosition = null, !0;
        this.context.play();
        return !1
    },
    HTML5API: {
        getVolume: function() {
            return this.context.volume || 1
        },
        setVolume: function(b) {
            this.context.volume = b;
            return 1E-4 > Math.abs(this.context.volume - b) ? !0 : !1
        },
        getCurrentTime: function() {
            return this.context.currentTime || 0
        },
        setCurrentTime: function(b) {
            try {
                return this.context.currentTime = b, !0
            } catch (c) {
                return !1
            }
        }
    },
    FLASHAPI: {
        getVolume: function() {
            return this.context && "function" === typeof this.context.getVolume ?
                this.context.getVolume() : 1
        },
        setVolume: function(b) {
            return this.context && "function" === typeof this.context.setVolume ? (this.context.setVolume(b), !0) : !1
        },
        getCurrentTime: function() {
            return this.context && "function" === typeof this.context.getCurrentTime ? this.context.getCurrentTime() : 0
        },
        setCurrentTime: function(b) {
            return this.context && "function" === typeof this.context.setCurrentTime ? this.context.setCurrentTime(b) : !1
        }
    }
};
if (void 0 === this.jukebox) throw "jukebox.Manager requires jukebox.Player (Player.js) to run properly.";
jukebox.Manager = function(b) {
    this.features = {};
    this.codecs = {};
    this.__players = {};
    this.__playersLength = 0;
    this.__clones = {};
    this.__queue = [];
    this.settings = {};
    for (var c in this.defaults) this.settings[c] = this.defaults[c];
    if ("[object Object]" === Object.prototype.toString.call(b))
        for (var d in b) this.settings[d] = b[d];
    this.__detectFeatures();
    jukebox.Manager.__initialized = !1 === this.settings.useGameLoop ? window.setInterval(function() {
        jukebox.Manager.loop()
    }, 20) : !0
};
jukebox.Manager.prototype = {
    defaults: {
        useFlash: !1,
        useGameLoop: !1
    },
    __detectFeatures: function() {
        var b = window.Audio && new Audio;
        if (b && b.canPlayType && !1 === this.settings.useFlash) {
            for (var c = [{
                            e: "3gp",
                            m: ["sounds/3gpp", "sounds/amr"]
                        }, {
                            e: "aac",
                            m: ["sounds/aac", "sounds/aacp"]
                        }, {
                            e: "amr",
                            m: ["sounds/amr", "sounds/3gpp"]
                        }, {
                            e: "caf",
                            m: ["sounds/IMA-ADPCM", "sounds/x-adpcm", 'sounds/x-aiff; codecs="IMA-ADPCM, ADPCM"']
                        }, {
                            e: "m4a",
                            m: 'sounds/mp4{sounds/mp4; codecs="mp4a.40.2,avc1.42E01E"{sounds/mpeg4{sounds/mpeg4-generic{sounds/mp4a-latm{sounds/MP4A-LATM{sounds/x-m4a'.split("{")
                        },
                        {
                            e: "mp3",
                            m: ["sounds/mp3", "sounds/mpeg", 'sounds/mpeg; codecs="mp3"', "sounds/MPA", "sounds/mpa-robust"]
                        }, {
                            e: "mpga",
                            m: ["sounds/MPA", "sounds/mpa-robust", "sounds/mpeg", "video/mpeg"]
                        }, {
                            e: "mp4",
                            m: ["sounds/mp4", "video/mp4"]
                        }, {
                            e: "ogg",
                            m: ["application/ogg", "sounds/ogg", 'sounds/ogg; codecs="theora, vorbis"', "video/ogg", 'video/ogg; codecs="theora, vorbis"']
                        }, {
                            e: "wav",
                            m: ["sounds/wave", "sounds/wav", 'sounds/wav; codecs="1"', "sounds/x-wav", "sounds/x-pn-wav"]
                        }, {
                            e: "webm",
                            m: ["sounds/webm", 'sounds/webm; codecs="vorbis"', "video/webm"]
                        }
                    ],
                    d, f, g = 0, l = c.length; g < l; g++)
                if (f = c[g].e, c[g].m.length && "object" === typeof c[g].m)
                    for (var p = 0, x = c[g].m.length; p < x; p++)
                        if (d = c[g].m[p], "" !== b.canPlayType(d)) {
                            this.codecs[f] = d;
                            break
                        } else this.codecs[f] || (this.codecs[f] = !1);
            this.features.html5audio = !(!this.codecs.mp3 && !this.codecs.ogg && !this.codecs.webm && !this.codecs.wav);
            this.features.channels = 8;
            b.volume = 0.1337;
            this.features.volume = !!(1E-4 > Math.abs(b.volume - 0.1337));
            navigator.userAgent.match(/iPhone|iPod|iPad/i) && (this.features.channels = 1)
        }
        this.features.flashaudio = !!navigator.mimeTypes["application/x-shockwave-flash"] || !!navigator.plugins["Shockwave Flash"] || !1;
        if (window.ActiveXObject) try {
            new ActiveXObject("ShockwaveFlash.ShockwaveFlash.10"), this.features.flashaudio = !0
        } catch (s) {}!0 === this.settings.useFlash && (this.features.flashaudio = !0);
        !0 === this.features.flashaudio && !this.features.html5audio && (this.codecs.mp3 = "sounds/mp3", this.codecs.mpga = "sounds/mpeg", this.codecs.mp4 = "sounds/mp4", this.codecs.m4a = "sounds/mp4", this.codecs["3gp"] = "sounds/3gpp", this.codecs.amr = "sounds/amr",
            this.features.volume = !0, this.features.channels = 1)
    },
    __getPlayerById: function(b) {
        return this.__players && void 0 !== this.__players[b] ? this.__players[b] : null
    },
    __getClone: function(b, c) {
        for (var d in this.__clones) {
            var f = this.__clones[d];
            if (null === f.isPlaying && f.origin === b) return f
        }
        if ("[object Object]" === Object.prototype.toString.call(c)) {
            d = {};
            for (var g in c) d[g] = c[g];
            d.autoplay = !1;
            g = new jukebox.Player(d, b);
            g.isClone = !0;
            g.wasReady = !1;
            return this.__clones[g.id] = g
        }
        return null
    },
    loop: function() {
        if (0 !== this.__playersLength)
            if (this.__queue.length &&
                this.__playersLength < this.features.channels) {
                var b = this.__queue[0],
                    c = this.__getPlayerById(b.origin);
                if (null !== c) {
                    var d = this.__getClone(b.origin, c.settings);
                    null !== d && (!0 === this.features.volume && (c = this.__players[b.origin]) && d.setVolume(c.getVolume()), this.add(d), d.play(b.pointer, !0))
                }
                this.__queue.splice(0, 1)
            } else
                for (d in this.__queue.length && 1 === this.features.channels && (b = this.__queue[0], c = this.__getPlayerById(b.origin), null !== c && c.play(b.pointer, !0), this.__queue.splice(0, 1)), this.__players) b = this.__players[d],
                    c = b.getCurrentTime() || 0, b.isPlaying && !1 === b.wasReady ? b.wasReady = b.setCurrentTime(b.isPlaying.start) : b.isPlaying && !0 === b.wasReady ? c > b.isPlaying.end && (!0 === b.isPlaying.loop ? b.play(b.isPlaying.start, !0) : b.stop()) : b.isClone && null === b.isPlaying ? this.remove(b) : void 0 !== b.backgroundMusic && null === b.isPlaying && c > b.backgroundMusic.end && b.backgroundHackForiOS()
    },
    getPlayableResource: function(b) {
        "[object Array]" !== Object.prototype.toString.call(b) && (b = [b]);
        for (var c = 0, d = b.length; c < d; c++) {
            var f = b[c],
                g = f.match(/\.([^\.]*)$/)[1];
            if (g && this.codecs[g]) return f
        }
        return null
    },
    add: function(b) {
        return b instanceof jukebox.Player && void 0 === this.__players[b.id] ? (this.__playersLength++, this.__players[b.id] = b, !0) : !1
    },
    remove: function(b) {
        return b instanceof jukebox.Player && void 0 !== this.__players[b.id] ? (this.__playersLength--, delete this.__players[b.id], !0) : !1
    },
    addToQueue: function(b, c) {
        return ("string" === typeof b || "number" === typeof b) && void 0 !== this.__players[c] ? (this.__queue.push({
            pointer: b,
            origin: c
        }), !0) : !1
    }
};



(function() {
    var b = {},
        c = null,
        d = !0,
        f = !1;
    if ("undefined" !== typeof AudioContext) c = new AudioContext;
    else if ("undefined" !== typeof webkitAudioContext) c = new webkitAudioContext;
    else if ("undefined" !== typeof Audio) {
        d = !1;
        try {
            new Audio
        } catch (g) {
            f = !0
        }
    } else d = !1, f = !0;
    if (d) {
        var l = "undefined" === typeof c.createGain ? c.createGainNode() : c.createGain();
        l.gain.value = 1;
        l.connect(c.destination)
    }
    var p = function() {
        this._volume = 1;
        this._muted = !1;
        this.usingWebAudio = d;
        this.noAudio = f;
        this._howls = []
    };
    p.prototype = {
        volume: function(b) {
            b =
                parseFloat(b);
            if (0 <= b && 1 >= b) {
                this._volume = b;
                d && (l.gain.value = b);
                for (var c in this._howls)
                    if (this._howls.hasOwnProperty(c) && !1 === this._howls[c]._webAudio)
                        for (b = 0; b < this._howls[c]._audioNode.length; b++) this._howls[c]._audioNode[b].volume = this._howls[c]._volume * this._volume;
                return this
            }
            return d ? l.gain.value : this._volume
        },
        mute: function() {
            this._setMuted(!0);
            return this
        },
        unmute: function() {
            this._setMuted(!1);
            return this
        },
        _setMuted: function(b) {
            this._muted = b;
            d && (l.gain.value = b ? 0 : this._volume);
            for (var c in this._howls)
                if (this._howls.hasOwnProperty(c) &&
                    !1 === this._howls[c]._webAudio)
                    for (var f = 0; f < this._howls[c]._audioNode.length; f++) this._howls[c]._audioNode[f].muted = b
        }
    };
    var x = new p,
        p = null;
    if (!f) var p = new Audio,
        s = {
            mp3: !!p.canPlayType("sounds/mpeg;").replace(/^no$/, ""),
            opus: !!p.canPlayType('sounds/ogg; codecs="opus"').replace(/^no$/, ""),
            ogg: !!p.canPlayType('sounds/ogg; codecs="vorbis"').replace(/^no$/, ""),
            wav: !!p.canPlayType('sounds/wav; codecs="1"').replace(/^no$/, ""),
            m4a: !!(p.canPlayType("sounds/x-m4a;") || p.canPlayType("sounds/aac;")).replace(/^no$/,
                ""),
            mp4: !!(p.canPlayType("sounds/x-mp4;") || p.canPlayType("sounds/aac;")).replace(/^no$/, ""),
            weba: !!p.canPlayType('sounds/webm; codecs="vorbis"').replace(/^no$/, "")
        };
    var y = function(b) {
        this._autoplay = b.autoplay || !1;
        this._buffer = b.buffer || !1;
        this._duration = b.duration || 0;
        this._format = b.format || null;
        this._loop = b.loop || !1;
        this._loaded = !1;
        this._sprite = b.sprite || {};
        this._src = b.src || "";
        this._pos3d = b.pos3d || [0, 0, -0.5];
        this._volume = void 0 !== b.volume ? b.volume : 1;
        this._urls = b.urls || [];
        this._rate = b.rate || 1;
        this._onload = [b.onload || function() {}];
        this._onloaderror = [b.onloaderror || function() {}];
        this._onend = [b.onend || function() {}];
        this._onpause = [b.onpause || function() {}];
        this._onplay = [b.onplay || function() {}];
        this._onendTimer = [];
        this._webAudio = d && !this._buffer;
        this._audioNode = [];
        this._webAudio && this._setupAudioNode();
        x._howls.push(this);
        this.load()
    };
    y.prototype = {
        load: function() {
            var d = this,
                g = null;
            if (!f) {
                for (var l = 0; l < d._urls.length; l++) {
                    var p, y;
                    if (d._format) p = d._format;
                    else if (y = d._urls[l].toLowerCase().split("?")[0], p =
                        (p = y.match(/.+\.([^?]+)(\?|$)/)) && 2 <= p.length ? p : y.match(/data\:audio\/([^?]+);/)) p = p[1];
                    else {
                        d.on("loaderror");
                        return
                    }
                    if (s[p]) {
                        g = d._urls[l];
                        break
                    }
                }
                if (g) {
                    d._src = g;
                    if (d._webAudio) {
                        var F = g;
                        if (F in b) d._duration = b[F].duration, u(d);
                        else {
                            var E = new XMLHttpRequest;
                            E.open("GET", F, !0);
                            E.responseType = "arraybuffer";
                            E.onload = function() {
                                c.decodeAudioData(E.response, function(c) {
                                    c && (b[F] = c, u(d, c))
                                }, function() {
                                    d.on("loaderror")
                                })
                            };
                            E.onerror = function() {
                                d._webAudio && (d._buffer = !0, d._webAudio = !1, d._audioNode = [], delete d._gainNode,
                                    d.load())
                            };
                            try {
                                E.send()
                            } catch (Ya) {
                                E.onerror()
                            }
                        }
                    } else {
                        var H = new Audio;
                        d._audioNode.push(H);
                        H.src = g;
                        H._pos = 0;
                        H.preload = "auto";
                        H.volume = x._muted ? 0 : d._volume * x.volume();
                        b[g] = d;
                        var P = function() {
                            d._duration = Math.ceil(10 * H.duration) / 10;
                            0 === Object.getOwnPropertyNames(d._sprite).length && (d._sprite = {
                                _default: [0, 1E3 * d._duration]
                            });
                            d._loaded || (d._loaded = !0, d.on("load"));
                            d._autoplay && d.play();
                            H.removeEventListener("canplaythrough", P, !1)
                        };
                        H.addEventListener("canplaythrough", P, !1);
                        H.load()
                    }
                    return d
                }
            }
            d.on("loaderror")
        },
        urls: function(b) {
            return b ? (this.stop(), this._urls = "string" === typeof b ? [b] : b, this._loaded = !1, this.load(), this) : this._urls
        },
        play: function(d, f) {
            var g = this;
            "function" === typeof d && (f = d);
            if (!d || "function" === typeof d) d = "_default";
            if (!g._loaded) return g.on("load", function() {
                g.play(d, f)
            }), g;
            if (!g._sprite[d]) return "function" === typeof f && f(), g;
            g._inactiveNode(function(l) {
                l._sprite = d;
                var s = 0 < l._pos ? l._pos : g._sprite[d][0] / 1E3,
                    p = g._sprite[d][1] / 1E3 - l._pos,
                    u = !(!g._loop && !g._sprite[d][2]),
                    y = "string" === typeof f ? f :
                    Math.round(Date.now() * Math.random()) + "",
                    H, P = {
                        id: y,
                        sprite: d,
                        loop: u
                    };
                H = setTimeout(function() {
                    !g._webAudio && u && g.stop(P.id, P.timer).play(d, P.id);
                    g._webAudio && !u && (g._nodeById(P.id).paused = !0, g._nodeById(P.id)._pos = 0);
                    !g._webAudio && !u && g.stop(P.id, P.timer);
                    g.on("end", y)
                }, 1E3 * p);
                g._onendTimer.push(H);
                P.timer = g._onendTimer[g._onendTimer.length - 1];
                if (g._webAudio) {
                    H = g._sprite[d][0] / 1E3;
                    var M = g._sprite[d][1] / 1E3;
                    l.id = y;
                    l.paused = !1;
                    H = [u, H, M];
                    M = g._nodeById(y);
                    M.bufferSource = c.createBufferSource();
                    M.bufferSource.buffer =
                        b[g._src];
                    M.bufferSource.connect(M.panner);
                    M.bufferSource.loop = H[0];
                    H[0] && (M.bufferSource.loopStart = H[1], M.bufferSource.loopEnd = H[1] + H[2]);
                    M.bufferSource.playbackRate.value = g._rate;
                    g._playStart = c.currentTime;
                    l.gain.value = g._volume;
                    "undefined" === typeof l.bufferSource.start ? l.bufferSource.noteGrainOn(0, s, p) : l.bufferSource.start(0, s, p)
                } else if (4 === l.readyState) l.id = y, l.currentTime = s, l.muted = x._muted, l.volume = g._volume * x.volume(), setTimeout(function() {
                    l.play()
                }, 0);
                else {
                    g._clearEndTimer(H);
                    var za = d,
                        na =
                        f,
                        sa = function() {
                            g.play(za, na);
                            l.removeEventListener("canplaythrough", sa, !1)
                        };
                    l.addEventListener("canplaythrough", sa, !1);
                    return g
                }
                g.on("play");
                "function" === typeof f && f(y);
                return g
            });
            return g
        },
        pause: function(b, c) {
            var d = this;
            if (!d._loaded) return d.on("play", function() {
                d.pause(b)
            }), d;
            d._clearEndTimer(c || 0);
            var f = b ? d._nodeById(b) : d._activeNode();
            if (f)
                if (f._pos = d.pos(null, b), d._webAudio) {
                    if (!f.bufferSource || f.paused) return d;
                    f.paused = !0;
                    "undefined" === typeof f.bufferSource.stop ? f.bufferSource.noteOff(0) :
                        f.bufferSource.stop(0)
                } else f.pause();
            d.on("pause");
            return d
        },
        stop: function(b, c) {
            var d = this;
            if (!d._loaded) return d.on("play", function() {
                d.stop(b)
            }), d;
            d._clearEndTimer(c || 0);
            var f = b ? d._nodeById(b) : d._activeNode();
            if (f)
                if (f._pos = 0, d._webAudio) {
                    if (!f.bufferSource || f.paused) return d;
                    f.paused = !0;
                    "undefined" === typeof f.bufferSource.stop ? f.bufferSource.noteOff(0) : f.bufferSource.stop(0)
                } else f.pause(), f.currentTime = 0;
            return d
        },
        mute: function(b) {
            var c = this;
            if (!c._loaded) return c.on("play", function() {
                    c.mute(b)
                }),
                c;
            var d = b ? c._nodeById(b) : c._activeNode();
            d && (c._webAudio ? d.gain.value = 0 : d.volume = 0);
            return c
        },
        unmute: function(b) {
            var c = this;
            if (!c._loaded) return c.on("play", function() {
                c.unmute(b)
            }), c;
            var d = b ? c._nodeById(b) : c._activeNode();
            d && (c._webAudio ? d.gain.value = c._volume : d.volume = c._volume);
            return c
        },
        volume: function(b, c) {
            var d = this;
            b = parseFloat(b);
            if (0 <= b && 1 >= b) {
                d._volume = b;
                if (!d._loaded) return d.on("play", function() {
                    d.volume(b, c)
                }), d;
                var f = c ? d._nodeById(c) : d._activeNode();
                f && (d._webAudio ? f.gain.value = b : f.volume =
                    b * x.volume());
                return d
            }
            return d._volume
        },
        loop: function(b) {
            return "boolean" === typeof b ? (this._loop = b, this) : this._loop
        },
        sprite: function(b) {
            return "object" === typeof b ? (this._sprite = b, this) : this._sprite
        },
        pos: function(b, d) {
            var f = this;
            if (!f._loaded) return f.on("load", function() {
                f.pos(b)
            }), "number" === typeof b ? f : f._pos || 0;
            b = parseFloat(b);
            var g = d ? f._nodeById(d) : f._activeNode();
            if (g) return 0 <= b ? (f.pause(d), g._pos = b, f.play(g._sprite, d), f) : f._webAudio ? g._pos + (c.currentTime - f._playStart) : g.currentTime;
            if (0 <= b) return f;
            for (g = 0; g < f._audioNode.length; g++)
                if (f._audioNode[g].paused && 4 === f._audioNode[g].readyState) return f._webAudio ? f._audioNode[g]._pos : f._audioNode[g].currentTime
        },
        pos3d: function(b, c, d, f) {
            var g = this;
            c = "undefined" === typeof c || !c ? 0 : c;
            d = "undefined" === typeof d || !d ? -0.5 : d;
            if (!g._loaded) return g.on("play", function() {
                g.pos3d(b, c, d, f)
            }), g;
            if (0 <= b || 0 > b) {
                if (g._webAudio) {
                    var l = f ? g._nodeById(f) : g._activeNode();
                    l && (g._pos3d = [b, c, d], l.panner.setPosition(b, c, d))
                }
            } else return g._pos3d;
            return g
        },
        fade: function(b, c, d,
            f, g) {
            var l = this,
                s = Math.abs(b - c),
                p = b > c ? "down" : "up",
                s = s / 0.01,
                u = d / s;
            if (!l._loaded) return l.on("load", function() {
                l.fade(b, c, d, f, g)
            }), l;
            l.volume(b, g);
            for (var y = 1; y <= s; y++)(function() {
                var b = Math.round(1E3 * (l._volume + ("up" === p ? 0.01 : -0.01) * y)) / 1E3;
                setTimeout(function() {
                    l.volume(b, g);
                    b === c && f && f()
                }, u * y)
            })()
        },
        fadeIn: function(b, c, d) {
            return this.volume(0).play().fade(0, b, c, d)
        },
        fadeOut: function(b, c, d, f) {
            var g = this;
            return g.fade(g._volume, b, c, function() {
                d && d();
                g.pause(f);
                g.on("end")
            }, f)
        },
        _nodeById: function(b) {
            for (var c =
                    this._audioNode[0], d = 0; d < this._audioNode.length; d++)
                if (this._audioNode[d].id === b) {
                    c = this._audioNode[d];
                    break
                }
            return c
        },
        _activeNode: function() {
            for (var b = null, c = 0; c < this._audioNode.length; c++)
                if (!this._audioNode[c].paused) {
                    b = this._audioNode[c];
                    break
                }
            this._drainPool();
            return b
        },
        _inactiveNode: function(b) {
            for (var c = null, d = 0; d < this._audioNode.length; d++)
                if (this._audioNode[d].paused && 4 === this._audioNode[d].readyState) {
                    b(this._audioNode[d]);
                    c = !0;
                    break
                }
            this._drainPool();
            if (!c) {
                var f;
                this._webAudio ? (f = this._setupAudioNode(),
                    b(f)) : (this.load(), f = this._audioNode[this._audioNode.length - 1], f.addEventListener("loadedmetadata", function() {
                    b(f)
                }))
            }
        },
        _drainPool: function() {
            var b = 0,
                c;
            for (c = 0; c < this._audioNode.length; c++) this._audioNode[c].paused && b++;
            for (c = this._audioNode.length - 1; 0 <= c && !(5 >= b); c--) this._audioNode[c].paused && (this._webAudio && this._audioNode[c].disconnect(0), b--, this._audioNode.splice(c, 1))
        },
        _clearEndTimer: function(b) {
            b = this._onendTimer.indexOf(b);
            b = 0 <= b ? b : 0;
            this._onendTimer[b] && (clearTimeout(this._onendTimer[b]),
                this._onendTimer.splice(b, 1))
        },
        _setupAudioNode: function() {
            var b = this._audioNode,
                d = this._audioNode.length;
            b[d] = "undefined" === typeof c.createGain ? c.createGainNode() : c.createGain();
            b[d].gain.value = this._volume;
            b[d].paused = !0;
            b[d]._pos = 0;
            b[d].readyState = 4;
            b[d].connect(l);
            b[d].panner = c.createPanner();
            b[d].panner.setPosition(this._pos3d[0], this._pos3d[1], this._pos3d[2]);
            b[d].panner.connect(b[d]);
            return b[d]
        },
        on: function(b, c) {
            var d = this["_on" + b];
            if ("function" === typeof c) d.push(c);
            else
                for (var f = 0; f < d.length; f++) c ?
                    d[f].call(this, c) : d[f].call(this);
            return this
        },
        off: function(b, c) {
            for (var d = this["_on" + b], f = c.toString(), g = 0; g < d.length; g++)
                if (f === d[g].toString()) {
                    d.splice(g, 1);
                    break
                }
            return this
        },
        unload: function() {
            for (var c = this._audioNode, d = 0; d < this._audioNode.length; d++) c[d].paused || this.stop(c[d].id), this._webAudio ? c[d].disconnect(0) : c[d].src = "";
            c = x._howls.indexOf(this);
            null !== c && 0 <= c && x._howls.splice(c, 1);
            delete b[this._src]
        }
    };
    if (d) var u = function(b, c) {
        b._duration = c ? c.duration : b._duration;
        0 === Object.getOwnPropertyNames(b._sprite).length &&
            (b._sprite = {
                _default: [0, 1E3 * b._duration]
            });
        b._loaded || (b._loaded = !0, b.on("load"));
        b._autoplay && b.play()
    };
    "function" === typeof define && define.amd && define(function() {
        return {
            Howler: x,
            Howl: y
        }
    });
    "undefined" !== typeof exports && (exports.Howler = x, exports.Howl = y);
    window.Howler = x;
    window.Howl = y
})();
