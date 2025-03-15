import request from "@/utils/request";

export function increaseVisit() {
  return request({
    url: "/gh/index/visit",
    method: "get",
  });
}

export function getIndexAllNumber() {
  return request({
    url: "/gh/index/allNumber",
    method: "get",
  });
}

export function getIndexLineData() {
  return request({
    url: "/gh/index/line",
    method: "get",
  });
}

export function getIndexRaddarData() {
  return request({
    url: "/gh/index/raddar",
    method: "get",
  });
}

export function getIndexPieData() {
  return request({
    url: "/gh/index/pie",
    method: "get",
  });
}

// export function getIndexBarData() {
//   return request({
//     url: "/gh/index/bar",
//     method: "get",
//   });
// }
