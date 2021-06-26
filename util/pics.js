"use strict";
const { Collection } = require("discord.js");
const path = require("path");
const pics = new Collection();

pics.set("cz", {
  n: "Caizhi",
  p: ["pics/o/cz_rd.jpg"],
});
pics.set("yc", {
  n: "Yun Che",
  p: [
    "pics/o/yc_bl.jpg",
    "pics/o/yc_bd.jpg",
    "pics/o/xl_wyc.jpg",
    "pics/m/yc_ba.jpg",
  ],
});
pics.set("js", {
  n: "Jasmine",
  p: [
    "pics/o/js_ndb.jpg",
    "pics/o/js_nlb.jpg",
    "pics/o/js_odb.jpg",
    "pics/o/js_olb.jpg",
    "pics/m/js_pyc.jpg",
  ],
});
pics.set("mx", {
  n: "Mu Xuanyin",
  p: [
    "pics/o/mx_fbh.jpg",
    "pics/o/mx_fwh.jpg",
    "pics/o/mx_cfbh.jpg",
    "pics/o/mx_cfwh.jpg",
    "pics/o/mx_op.png",
  ],
});
pics.set("cw", {
  n: "Chi Wuyao",
  p: ["pics/o/cw_wc.jpg", "pics/o/cw_cl.jpg", "pics/o/cw_cwc.jpg"],
});
pics.set("cyc", {
  n: "Chu Yuechan",
  p: ["pics/m/cyc_bp.jpg", "pics/m/cyc_bc.jpg", "pics/m/cyc_ud.jpg"],
});
pics.set("xq", {
  n: "Xia Qingyue",
  p: [
    "pics/o/xq_db.jpg",
    "pics/o/xq_lb.jpg",
    "pics/o/xq_bp.jpg",
    "pics/o/xq_cbp.jpg",
    "pics/m/xq_mbp.jpg",
  ],
});
pics.set("cy", {
  n: "Cang Yue",
  p: [
    "pics/m/cy_wd.jpg",
    "pics/m/cy_std.jpg",
    "pics/m/cy_es.jpg",
    "pics/m/cy_el.jpg",
  ],
});
pics.set("xl", {
  n: "Xiao Lingxi",
  p: ["pics/o/xl_wyc.jpg"],
});
pics.set("qy", {
  n: "Qianye Yinger",
  p: ["pics/o/qy_gh.jpg", "pics/o/qy_bh.jpg"],
});
pics.set("h", {
  n: "Hong'er",
  p: ["pics/m/h_s.jpg", "pics/m/h_po.jpg"],
});
pics.set("lde", {
  n: "Huan Caiyi",
  p: ["pics/m/lde_s.jpg", "pics/m/lde_st.jpg"],
});
pics.set("fx", {
  n: "Feng Xue'er",
  p: ["pics/m/fx_fs.jpg", "pics/m/fx_fst.jpg"],
});

module.exports = pics;
