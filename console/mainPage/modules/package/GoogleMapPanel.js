/**
 * @author Shane Yi <scps950613@gmail.com>
 * @date 2017-05-12
 */
Ext.define('Console.package.GoogleMapPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.googlemappanel',
    requires: ['Ext.window.MessageBox'],

    config: {
        City: ['台北市', '新北市', '桃園市', '台中市', '台南市', '高雄市'],
    },

    initComponent : function(){
        Ext.applyIf(this,{
            plain: true,
            gmapType: 'map',
            border: false
        });

        this.callParent();
    },

    onBoxReady : function(){
        var center = this.center;
        this.callParent(arguments);

        if (center) {
            if (center.geoCodeAddr) {
                this.lookupCode(center.geoCodeAddr, center.marker);
            } else {
                this.createMap(center);
            }
        } else {
            Ext.Error.raise('center is required');
        }

    },

    createMap: function(center, marker) {
        var options = Ext.apply({}, this.mapOptions);

        options = Ext.applyIf(options, {
            zoom: 13,
            center: center,
            mapTypeControl: false,
            streetViewControl: false,
        });
        this.gmap = new google.maps.Map(this.body.dom, options);

        var selectCity = this.getSelectCity();
        this.setEventGoCity(selectCity, this.gmap);
        this.gmap.controls[google.maps.ControlPosition.TOP_LEFT].push(selectCity);

        if (marker) {
            this.addMarker(Ext.applyIf(marker, {
                position: center
            }));
        }

        Ext.each(this.markers, this.addMarker, this);
        this.fireEvent('mapready', this, this.gmap);
    },

    addMarker: function(marker) {
        var options = {
            map: this.gmap,
            title: marker.title,
            position: marker.position ? marker.position : new google.maps.LatLng(marker.lat, marker.lng)
        };

        if(marker.image) {
            var img = new Image();
            var size = marker.imageSize ? marker.imageSize : 1;
            img.src = marker.image;

            img.onload = function() {
                options.icon = {
                    url: this.src,
                    size: new google.maps.Size(this.width, this.height),          // 原始圖片大小
                    scaledSize: new google.maps.Size(this.width*size, this.height*size),// 縮小放大後的大小
                    anchor: new google.maps.Point(this.width*size/2, this.height*size),   // 顯示在地圖座標上，佔scaledSize大小的位置
                };

                var markerObject = new google.maps.Marker(options);
                Ext.Object.each(marker.listeners, function(name, fn){
                    google.maps.event.addListener(markerObject, name, fn);
                });
            }
        } else {
            var markerObject = new google.maps.Marker(options);
            Ext.Object.each(marker.listeners, function(name, fn){
                google.maps.event.addListener(markerObject, name, fn);
            });
        }
    },

    lookupCode : function(addr, marker) {
        this.geocoder = new google.maps.Geocoder();
        this.geocoder.geocode({
            address: addr
        }, Ext.Function.bind(this.onLookupComplete, this, [marker], true));
    },

    onLookupComplete: function(data, response, marker){
        if (response != 'OK') {
            Ext.MessageBox.alert('Error', 'An error occured: "' + response + '"');
            return;
        }
        this.createMap(data[0].geometry.location, marker);
    },

    afterComponentLayout: function(w, h){
        this.callParent(arguments);
        this.redraw();
    },

    redraw: function(){
        var map = this.gmap;
        if (map) {
            google.maps.event.trigger(map, 'resize');
        }
    },

    getSelectCity: function(){
        var city = this.getCity();
        var selectCity = document.createElement('select');
        selectCity.style.margin = '10px';
        selectCity.style.fontSize = '12px';
        selectCity.style.padding = '5px';
        selectCity.style.borderRadius = '2px';

        for (var i = 0; i < city.length; i++) {
            var inner = document.createElement('option');
            inner.setAttribute('value', i);
            inner.innerText = city[i];
            selectCity.appendChild(inner);
        }

        return selectCity;
    },

    setEventGoCity: function(el, map) {
        var me = this;
        var Address;

        if (!me.geocoder) {
            me.geocoder = new google.maps.Geocoder();
        }

        el.addEventListener("change", function() {

            me.geocoder.geocode({
                address: '台灣' + me.getCity()[el.value]
            },
            function(response, status) {
                if (status === 'OK') {
                    map.setZoom(13);
                    map.setCenter(response[0].geometry.location);
                }
            });
        });
    }
});
