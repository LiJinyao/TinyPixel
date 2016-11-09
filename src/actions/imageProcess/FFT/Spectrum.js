/* eslint-disable */
var SpectrumViewer = {};  // top-level namespace


// core operations
var _n = 0,
    _data = null;
var core = {
  init : function(data, width) {
    _n = width;
    _data = data;
  },
  // renders FFT power spectrum on the canvas
  render : function(re, im, islog) {
    var val = 0,
        i = 0,
        p = 0,
        spectrum = [],
        max = 1.0,
        imax = 0.0,
        n2 = _n*_n,
        log = Math.log,
        sqrt = Math.sqrt;
    for(var i=0; i<n2; i++) {
      if(islog){
        spectrum[i] = log(Math.sqrt(re[i]*re[i] + im[i]*im[i]));
      } else {
        spectrum[i] = sqrt(re[i]*re[i] + im[i]*im[i]);
      }
      if(spectrum[i] > max) {
        max = spectrum[i];
      }
    }
    imax = 1/max;
    for(var j=0; j<n2; j++) {
      spectrum[j] = spectrum[j]*255*imax;
    }
    for(var y=0; y<_n; y++) {
      i = y*_n;
      for(var x=0; x<_n; x++) {
        val = spectrum[i + x];
        p = (i << 2) + (x << 2);
        _data[p] = val;
        _data[p + 1] = val;
        _data[p + 2] = val;
        _data[p + 3] = 255;
      }
    }
    return _data;
    // _context.putImageData(_img, 0, 0);

  }
};
// aliases (public APIs)
SpectrumViewer.init = core.init;
SpectrumViewer.draw = core.render;
export default SpectrumViewer;
