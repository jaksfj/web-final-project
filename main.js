
function setClock() {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secondHand = document.querySelector(".second");
    const minuteHand = document.querySelector(".minute");
    const hourHand = document.querySelector(".hour");

    const secondDeg = (seconds / 60) * 360;
    const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
    const hourDeg = (hours % 12) / 12 * 360 + (minutes / 60) * 30;

    /* 침의 값에 따른 각도를 옮기기 */
    secondHand.style.transform = `rotate(${secondDeg}deg) translateX(-50%)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg) translateX(-50%)`;
    hourHand.style.transform = `rotate(${hourDeg}deg) translateX(-50%)`;
}

setInterval(setClock, 1000);

// 페이지 배경사진,명언 7초마다 변환
document.addEventListener("DOMContentLoaded", () => {

    // 새로 추가할 검색 기능 관련 코드
    const searchForm = document.getElementById("search-form");
    const categorySelect = document.getElementById("search-category");
    const keywordSelect = document.getElementById("search-keyword");

    // 대분류에 따른 세부 항목
    const optionsByCategory = {
        leagues: [
            { value: "premierleague.html", text: "프리미어리그" },
            { value: "la_liga.html", text: "라리가" },
            { value: "serieA.html", text: "세리에 A" },
            { value: "bundesliga.html", text: "분데스리가" },
            { value: "ligue1.html", text: "리그앙" },
            { value: "eredivisie.html", text: "에레디비시" },
            { value: "kleague.html", text: "K리그" },
            { value: "primeiraLiga.html", text: "프리메이라리가" },
            { value: "superLig.html", text: "쉬페르리그" },
            { value: "jleague.html", text: "J리그" }
        ],
        teams: [
            { value: "tottenham.html", text: "토트넘" },
            { value: "bayernMunich.html", text: "바이에른 뮌헨" },
            { value: "lutonTown.html", text: "루턴타운" },
            { value: "napoli.html", text: "나폴리" },
            { value: "barcelona.html", text: "바르셀로나" },
            { value: "dortmund.html", text: "도르트문트" },
            { value: "fcSeoul.html", text: "FC서울" },
            { value: "feyenoord.html", text: "페예노르트" },
            { value: "gwangjuFc.html", text: "광주 FC" },
            { value: "kyotoSangaFc.html", text: "교토상가 FC" }
        ],
        players: [
            { value: "sonHeungMin.html", text: "손흥민" },
            { value: "parkJiSung.html", text: "박지성" },
            { value: "kimMinJae.html", text: "김민재" },
            { value: "lionelMessi.html", text: "리오넬 메시" },
            { value: "robertLewandowski.html", text: "로베르토 레반도프스키" },
            { value: "toniKroos.html", text: "토니 크로스" },
            { value: "pele.html", text: "펠레" },
            { value: "carlesPuyol.html", text: "카를로스 푸욜" },
            { value: "ronaldo.html", text: "호나우두" },
            { value: "zidane.html", text: "지단" }
        ],
        matches: [
            { value: "sonBurnleyMatch.html", text: "손흥민 (19/20 PL 16R) 번리전" },
            { value: "tottenhamUCLSemiFinal.html", text: "토트넘 챔피언스리그 (18/19 UCL 4강)" },
            { value: "worldCup2022Final.html", text: "2022 카타르 월드컵 결승전" },
            { value: "parkJiSungSouthAfricaFriendly.html", text: "박지성 남아공 월드컵 국가대표팀 평가전" },
            { value: "kimMinJaeSerieA7R.html", text: "김민재 (22/23 세리에A 7R)" },
            { value: "berwijnPL17R.html", text: "베르바인 (21/22 PL 17R)" },
            { value: "worldCup2018GermanyKorea.html", text: "2018 러시아 월드컵 대한민국 vs 독일" },
            { value: "worldCup2022PortugalKorea.html", text: "2022 카타르 월드컵 대한민국 vs 포르투갈" },
            { value: "carlosUFOShoot.html", text: "1997 브라질 vs 프랑스 카를로스 UFO 슛" },
            { value: "parkChuYoungArsenalGoal.html", text: "박주영 아스날 데뷔골" }
        ],
        communities: [
            { value: "sofascore.html", text: "소파스코어 (선수 평점 및 경기 양상 확인)" },
            { value: "fotmob.html", text: "풋 몹 (실시간 스코어 확인 및 경기 정보 제공)" },
            { value: "soccerline.html", text: "사커라인 (축구 정보와 커뮤니티 제공)" },
            { value: "understat.html", text: "언더스탯 (경기 데이터를 쉽게 파악할 수 있는 사이트)" },
            { value: "whoscored.html", text: "WhoScored (경기 통계와 선수 평가 제공)" },
            { value: "totalfootballanalysis.html", text: "TotalFootballAnalysis (전술 분석 및 스카우팅 정보 제공)" },
            { value: "transfermarkt.html", text: "Transfermarkt (선수들의 이적 정보 제공)" },
            { value: "footballuser.html", text: "FootballUser (나만의 포메이션 작성 가능)" },
            { value: "physioroom.html", text: "PhysioRoom (선수들의 부상 현황 제공)" },
            { value: "sportinglife.html", text: "SportingLife (최신 축구 기사와 정보 제공)" }
        ]
    };

    // 대분류 변경 시 세부 항목 업데이트
    categorySelect.addEventListener("change", () => {
        const selectedCategory = categorySelect.value;
        keywordSelect.innerHTML = ""; // 기존 옵션 초기화

        if (optionsByCategory[selectedCategory]) {
            keywordSelect.innerHTML = `<option value="">항목을 선택하세요</option>`; // 기본 선택 항목 추가
            optionsByCategory[selectedCategory].forEach(option => {
                const optElement = document.createElement("option");
                optElement.value = option.value;
                optElement.textContent = option.text;
                keywordSelect.appendChild(optElement);
            });
        } else {
            keywordSelect.innerHTML = `<option value="">대분류를 먼저 선택하세요</option>`;
        }
    });

    // 검색 폼 제출 이벤트
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const category = categorySelect.value;
        const keyword = keywordSelect.value;

        if (!category) {
            alert("대분류를 선택하세요.");
            return;
        }

        if (!keyword) {
            alert("항목을 선택하세요.");
            return;
        }

        console.log("카테고리:", category, "키워드:", keyword);
        window.location.href = keyword;
    });

    if (searchForm && keywordSelect) {
        keywordSelect.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                console.log("엔터 키 눌림");
                searchForm.requestSubmit(); // 폼 제출
            }
        });
    } else {
        console.error("요소를 찾을 수 없습니다. 'search-form' 또는 'search-keyword' 확인하세요.");
    }
});

function toggleSearch() { // 숨겨진 검색 폼이 나타나게 하는 함수
    const searchForm = document.getElementById("search-form");
    if (searchForm.style.display === "none" || searchForm.style.display === "") {
        searchForm.style.display = "flex";
    } else {
        searchForm.style.display = "none";
    }
}

// 검색 함수
function searchFunction(event) {
    // 기본 form 제출 동작 방지
    event.preventDefault();

    // 카테고리 및 키워드 값 가져오기
    const category = document.getElementById("search-category").value;
    const keyword = document.getElementById("search-keyword").value;

    // 디버깅 로그
    console.log("카테고리:", category, "키워드:", keyword);

    return false; // 기본 동작 방지
}

// 키보드 엔터 감지
document.getElementById("search-keyword").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        // 엔터 키를 누르면 폼 제출
        console.log("엔터 키 눌림");
        document.getElementById("search-form").requestSubmit();
    }
});
