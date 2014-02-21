var YunProtocol = require('../lib/yun_led_protocol');

var ArduinoYun = module.exports = function() {
  this.name = 'yun';
  this.state = 'off';
  this.ipAddr = '10.0.0.13';
  this.protocol = new YunProtocol(this.ipAddr);
};

ArduinoYun.prototype.init = function(config) {
  config
    .when('off', { allow: ['turn-on'] })
    .when('on', { allow: ['turn-off'] })
    .map('turn-on', this.turnOn)
    .map('turn-off', this.turnOff);
};

ArduinoYun.prototype.turnOn = function(cb) {
  var self = this;
  this.protocol.on(function(err, res) {
    if(err) {
      cb(err);
    } else {
      self.state = 'on';
      cb(null, res);
    }
  });
};

ArduinoYun.prototype.turnOff = function(cb) {
  var self = this;
  this.protocol.off(function(err, res) {
    if(err) {
      cb(err);
    } else {
      self.state = 'off';
      cb(null, res);
    }
  });
};
