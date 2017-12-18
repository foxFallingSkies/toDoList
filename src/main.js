Vue.component({
    props: [],
    template: ''
})
var app = new Vue({
    el: '.list-container',
    data: {
        addList: [], //展示列表数据源
        completeList: [], //完成列表数据源
        unCompleteList: [], //未完成列表数据源
        addText: '', //添加的文字
        targetValue: '', //目标文字
        currentIndex: 0, //当前idnex
        totalList: [], //全部数据的数据源
        first: true, //第一次显示
        listNav: [{
            value: 'all',
            text: '所有目标',
            isActived: true
        }, {
            value: 'compent',
            text: '已完成目标',
            isActived: false
        }, {
            value: 'todo',
            text: '未完成目标',
            isActived: false
        }]
    },
    methods: {
        /**
         * [addListFun 添加目标]
         * @param {[type]} e [description]
         */
        addListFun: function(e) {
            var addText = this.addText;
            for(var i=0; i < this.totalList.length;i++){
                if(addText === this.totalList[i].value){
                    alert('目标已有，请不要重复添加哦');
                    return;
                }
            }
            if (this.first) {
                this.addList.push({
                    value: addText,
                    isShow: false,
                    isHide: false,
                    isOperHide: false,
                    isShowOper:false
                });
            }

            this.totalList.push({
                value: addText,
                isShow: false,
                isHide: false,
                isOperHide: false,
                isShowOper:false
            });

            this.unCompleteList.push({
                value: addText,
                isShow: false,
                isHide: false,
                isOperHide: false,
                isShowOper:false
            });
            this.addText = '';
        },
        /**
         * [listClickFun 导航模块点击事件,切换数据源]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        listClickFun: function(e) {
            var elem = e.target,
                targetValue = elem && elem.dataset.value;
            this.first = false;
            for (i = 0; i < this.listNav.length; i++) {
                this.listNav[i].isActived = false;
                if (this.listNav[i].value === targetValue) {
                    this.listNav[i].isActived = true;
                }
            }
            switch (targetValue) {
                case 'all':
                    this.addList = this.totalList;
                    break;
                case 'compent':
                    this.addList = this.completeList;
                    break;
                case 'todo':
                    this.addList = this.unCompleteList;
                    break;
            }
        },

        /**
         * [editFun 编辑操作方法]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        editFun: function(e) {
            var index = $(e.target).parent().parent().index();
            this.targetValue = this.addList[index].value;
            this.addList[index].isShow = true;
            this.addList[index].isHide = true;
            this.currentIndex = index;
        },

        /**
         * [completeFun 完成操作方法]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        completeFun: function(e) {
            var index = $(e.target).parent().parent().index(),
                listValue = $(e.target).parent().parent().find('span').eq(0).text();
            this.addList[index].isOperHide = true;
            this.completeList.push(this.addList[index]);
            this.unCompleteList.splice(0, this.unCompleteList.length);
            //this.totalList = this.addList;       

            //遍历循环将完成数据和未完成的放入相应的数组
            for (var i = 0; i < this.totalList.length; i++) {
                var totaleValue = this.totalList[i].value;
                if(totaleValue === listValue){
                    this.totalList[i].isOperHide = true;
                }
                var isOk = false;
                for (var j = 0; j < this.completeList.length; j++) {
                    if (totaleValue === this.completeList[j].value) {
                        isOk = true;
                    }
                }
                if (!isOk) {
                    this.unCompleteList.push(this.totalList[i]);
                }
            }
        },
        /**
         * [deleteFun 删除操作]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        deleteFun: function(e) {
            var listValue = $(e.target).parent().parent().find('span').eq(0).text();

            this.deleteCommonFun(listValue, 'totalList'); //删除totalList中的数据
            this.deleteCommonFun(listValue, 'completeList'); //删除completeList中的数据
            this.deleteCommonFun(listValue, 'unCompleteList'); //删除unCompleteList中的数据
        },
        /**
         * [deleteCommonFun 删除的公共方法，判断value是否相同,然后删除数据源中的数据]
         * @param  {[type]} listValue [value]
         * @param  {[type]} arr       [相应的数据源]
         * @return {[type]}           [description]
         */
        deleteCommonFun: function(listValue, arr) {
            for (var i = 0; i < this[arr].length; i++) {
                var value = this[arr][i].value;
                if (value === listValue) {
                    this[arr].splice(i, 1);
                }
            }
        },
        /**
         * [editComFun 编辑完成enter事件]
         * @return {[type]} [description]
         */
        editComFun: function() {
            this.addList[this.currentIndex].value = this.targetValue;
            this.addList[this.currentIndex].isShow = false;
            this.addList[this.currentIndex].isHide = false;
        },
        /**
         * [mouseEnterFun 鼠标移入操作]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        mouseEnterFun:function(e){
            var index = $(e.target).index();
            this.addList[index].isShowOper = true;
        },
        /**
         * [mouseLeaveFun 鼠标移出操作]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        mouseLeaveFun:function(e){
            var index = $(e.target).index();
            this.addList[index].isShowOper = false;
        }
    }
});