/* eslint-disable */
var FrequencyFilter = {};  // top-level namespace

// core operations
var _n = 0;
var core = {
  init : function(n) {
    if(n !== 0 && (n & (n - 1)) === 0) {
      _n = n;
    } else {
      throw new Error("init: radix-2 required");
    }
  },
  // swaps quadrant
  swap : function(re, im) {
    var xn, yn, i, j, k, l, tmp,
        len = _n >> 1;
    for(var y=0; y<len; y++) {
      yn = y + len;
      for(var x=0; x<len; x++) {
        xn = x + len;
        i = x + y*_n;
        j = xn + yn*_n;
        k = x + yn*_n;
        l = xn + y*_n;
        tmp = re[i];
        re[i] = re[j];
        re[j] = tmp;
        tmp = re[k];
        re[k] = re[l];
        re[l] = tmp;
        tmp = im[i];
        im[i] = im[j];
        im[j] = tmp;
        tmp = im[k];
        im[k] = im[l];
        im[l] = tmp;
      }
    }
  },
  GLPF : function(re, im, radius) {
    var i = 0,
        p = 0,
        r = 0.0,
        n2 = _n >> 1,
        d = 0,
        sqrt = Math.sqrt;
    for(var y=-n2; y<n2; y++) {
      i = n2 + (y + n2)*_n;
      for(var x=-n2; x<n2; x++) {
        p = x + i;
        d = - (x*x + y*y)  / (2 * radius * radius);
        r = Math.pow(Math.E, d);
        re[p] *= r;
        im[p] *= r;
      }
    }
  },
    GHPF : function(re, im, radius) {
      var i = 0,
          p = 0,
          r = 0.0,
          n2 = _n >> 1,
          d = 0,
          sqrt = Math.sqrt;
      for(var y=-n2; y<n2; y++) {
        i = n2 + (y + n2)*_n;
        for(var x=-n2; x<n2; x++) {
          p = x + i;
          d = - (x*x + y*y)  / (2 * radius * radius);
          r = 1 - Math.pow(Math.E, d);
          re[p] *= r;
          im[p] *= r;
        }
      }
    },
  // applies High-Pass Filter
  HPF : function(re, im, radius) {
    var i = 0,
        p = 0,
        r = 0.0,
        n2 = _n >> 1,
        sqrt = Math.sqrt;
    for(var y=-n2; y<n2; y++) {
      i = n2 + (y + n2)*_n;
      for(var x=-n2; x<n2; x++) {
        r = sqrt(x*x + y*y);
        p = x + i;
        if(r < radius) {
          re[p] = im[p] = 0;
        }
      }
    }
  },
  // applies Low-Pass Filter
  LPF : function(re, im, radius) {
    var i = 0,
        p = 0,
        r = 0.0,
        n2 = _n >> 1,
        sqrt = Math.sqrt;
    for(var y=-n2; y<n2; y++) {
      i = n2 + (y + n2)*_n;
      for(var x=-n2; x<n2; x++) {
        r = sqrt(x*x + y*y);
        p = x + i;
        if(r > radius) {
          re[p] = im[p] = 0;
        }
      }
    }
  },
  BWLPF : function(re, im, radius) {
    var i = 0,
        p = 0,
        r = 0.0,
        n2 = _n >> 1,
        d = 0,
        sqrt = Math.sqrt;
    for(var y=-n2; y<n2; y++) {
      i = n2 + (y + n2)*_n;
      for(var x=-n2; x<n2; x++) {
        d = (x*x + y*y) / radius;
        // n = 1
        r = 1 / (1 + d * d);
        p = x + i;
        re[p] *= r;
        im[p] *= r;
      }
    }
  },
};
// aliases (public APIs)
var apis = ['init', 'swap', 'HPF', 'LPF', 'GHPF', 'GLPF', 'BWLPF'];
for(var i=0; i<apis.length; i++) {
  FrequencyFilter[apis[i]] = core[apis[i]];
}

export default FrequencyFilter;
