// --------------------------------------------------------------------------
// Template literal
// - 데이터 + 템플릿 = 마크업 스트링
// - 템플릿 리터럴 구문을 사용해 마크업 스트링 생성
// --------------------------------------------------------------------------

// 데이터(상태 : state)
// 클라이언트 요청 => 서버 -> 클라이언트 응답 ->
const koreanFoods = {
  'caption': "한식 메뉴",
  'rows': [
    { headline: "뚝배기 불고기", content: 8000 },
    { headline: "스팸치즈볶음밥", content: 7500 },
    { headline: "불고기낙지덮밥", content: 9000 },
  ],
};

function renderTable(data) {
  return [
    '<table class="table">',
    '<caption class="sr-only">' + data.caption + "</caption>",
    data.rows.reduce(function (htmlString, rowData) {
      const rowString = [
        "<tr>",
        "<th>" + rowData.headline + "</th>",
        "<td>" + numberWithComma(rowData.content) + "원" + "</td>",
        "</tr>",
      ].join("");
      return htmlString + rowString;
    }, ""),
    "</table>",
  ].join("");
}

// 🔶 renderTableString 함수를 작성하세요.
// Javascript 파일 안에서 마크업 구성
function renderTableString(data /* {caption : string , rows: [] } ,  */) {
  const markup = `
   <table class="table">
    <caption class="sr-only">${data.caption}</caption>
    ${data.rows.reduce(/* 리듀서 함수 */function(htmlString, rowItem) {
      return htmlString + `
      <tr>
        <th>${rowItem.headline}</th>
        <td>${numberWithComma(rowItem.content)}원</td>
      </tr>
      `
    }, '')}
  </table>
  `;

  return removeSpaceHTMLString(markup)
}

function run() {
  const renderedResult1 = renderTable(koreanFoods);
  console.log(renderedResult1)
  const renderedResult = renderTableString(koreanFoods);
  return renderedResult;
}

console.log(run());

// --------------------------------------------------------------------------
// utils

function numberWithComma(numberValue) {
  return numberValue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function removeSpaceHTMLString(htmlString) {
  return htmlString.replace(/\s+<|\n|>\s+/g, function ($1) {
    return $1.indexOf("<") > -1 ? "<" : $1.indexOf(">") > -1 ? ">" : "";
  });
}
