Page({
    data: {
        markers: [{
            iconPath: "/images1/vr.png",
            id: 0,
            latitude: 23.099994,
            longitude: 113.324520,
            width: 50,
            height: 50
        }],
        polyline: [{
            points: [{
                longitude: 113.3245211,
                latitude: 23.10229
            }, {
                longitude: 113.324520,
                latitude: 23.21229
            }],
            color:"#FF0000DD",
            width: 2,
            dottedLine: true
        }],
        controls: [{
            id: 1,
            iconPath: '/images1/wx.png',
            position: {
                left: 0,
                top: 300 - 50,
                width: 50,
                height: 50
            },
            clickable: true
        }]
    },
    regionchange:function(e) {
        console.log(e.type)
    },
    markertap:function(e) {
        wx.getLocation({
            type: 'wgs84',
            success: function(res) {
                var latitude = res.latitude;
                var longitude = res.longitude;
                wx.openLocation({
                    latitude: latitude,
                    longitude: longitude,
                    scale: 28
                })
            }
        })
    },
    controltap:function(e) {
        console.log(e.controlId)
    }
})