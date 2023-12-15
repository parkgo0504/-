const onlyPlans = [
    {id: "asdf", title: "여행한번 잘 가봅시다"}, 
    {id: "vvev", title:"목포숨은맛집뽀시기"}
];

const samplePlans = 
[
    {
        id: "asdf", 
        title: "여행한번 잘 가봅시다",
        boardList: [
            {
                id: 'asdf',
                title: '1일차',
                schedules: [
                    {
                        id: "aaab",
                        content: "정말맛있는식당1"
                    }, {
                        id: "aaac",
                        content: "정말맛있는식당2"
                    }, {
                        id: "adaa",
                        content: "정말맛있는식당3"
                    }, {
                        id: "agreijaa",
                        content: "정말맛있는식당4"
                    }, {
                        id: "akijuaaa",
                        content: "정말맛있는식당5"
                    }
                ]
            },
            {
                id: 'v834hadf',
                title: '2일차',
                schedules:  [
                    {
                        id: "aaab",
                        content: "이지투온"
                    }, {
                        id: "aaac",
                        content: "정좋숙"
                    }, {
                        id: "adaa",
                        content: "정말맛ㄹㄹ있는식당3"
                    }, {
                        id: "agreijaa",
                        content: "정말ㅈ맛있는식당4"
                    }, {
                        id: "akijuaaa",
                        content: "정말맛있는ㅛㅅ식당5"
                    }
                ]
            }
        ]
    }, 
    {
        id: "vvev", 
        title: "목포숨은맛집뽀시기",
        boardList: [
            {
                id: 'asdf',
                title: '1일차',
                schedules: [
                    {
                        id: "aaab",
                        content: "놀이공원"
                    }, {
                        id: "aaac",
                        content: "회전목마"
                    }, {
                        id: "adaa",
                        content: "피자집"
                    }, {
                        id: "agreijaa",
                        content: "누룽지"
                    }, {
                        id: "akijuaaa",
                        content: "회전목마"
                    }
                ]
            },
            {
                id: 'v834hadf',
                title: '2일차',
                schedules:  [
                    {
                        id: "aaab",
                        content: "짱짱모텔"
                    }, {
                        id: "aaac",
                        content: "호로록해수욕장"
                    }, {
                        id: "adaa",
                        content: "오리배"
                    }, {
                        id: "agreijaa",
                        content: "극한의클라이밍"
                    }, {
                        id: "akijuaaa",
                        content: "포장마차"
                    }
                ]
            }
        ]
    }
];

function getPlanById(id){
    return samplePlans.find((item) => item.id == id);
}

export {onlyPlans, getPlanById}