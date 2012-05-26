/**
 * 任务控制流
 * 支持串行、并行总线
 * 支持为每个增加任务传参
 * @class MissionsClass
 * @author i@xunuo.com
 * @requires extend
 */

/**
 * 声明依赖
 */
var extend = require('node.extend');

/**
 * 声明类
*/
var MissionsClass = function(){
	/**
	 * 默认配置项
	 * @property this.config
	 */
	this.config = {
		/** 
		 * 任务流运行模式
		 * @property this.config.type {string} serial(串行) | paiallel(并行)
		 * @default serial
		 */
		type : "serial",
		/** 
		 * 任务完成回调
		 * @property this.config.completeCallBack {function}
		 * @default empty function
		 */
		completeCallBack : function(){}
	};
	
	/** 
	 * 用于有序化的任务数组
	 * @property this.missionItemsIndex {array}
	 * @default []
	 */
	this.missionItemsIndex = [];
	
	/** 
	 * 保存任务映射函数的对象
	 * @property this.missionItems {object}
	 * @default {}
	 */
	this.missionItems = {};
	
	/** 
	 * 任务数
	 * @property this.missionCount {number}
	 * @default 0
	 */
	this.missionCount = 0;
	
};

MissionsClass.prototype = {
	/**
	 * 初始化
	 * @method init
	 */
	init : function(customConfig){
		extend( true, this.config, customConfig );
		return this;
	},

	/**
	 * 新增任务
	 * @method join
	 * @param callback {function} 任务调用函数
	 * @param [argsObj] {object} 传参或作用域
	 */
	join : function(callbackFn,argsObj){
		var key =  "mission." + Math.random();
		this.missionItemsIndex.push( key );
		this.missionItems[key] = {
			callback : callbackFn,
			args : argsObj ? argsObj : {}
		};
	},

	/**
	 * 完成任务调用
	 * @method complete
	 */
	complete : function(){
		
		var config = this.config;
		
		// get current key
		var key = this.missionItemsIndex[this.missionCount];
		this.missionCount++;


		// 如果是串行，需要执行
		if( config.type === "serial"){
			if(key){
				this.missionItems[key].callback.call(this,this.missionItems[key].args);
			}else{
				this.config.completeCallBack();
			}
		}
		
		// 如果是并行 最后一项 调用最终回调 以及析构
		if( config.type === "paiallel"){
			if(this.missionCount >= this.missionItemsIndex.length){
				this.config.completeCallBack();
			}
		}

	},

	/**
	 * 开始任务
	 * @method start
	 */
	start : function(callback){
		var config = this.config;
		if(config.type === "paiallel"){
			for(var i=0; i < this.missionItemsIndex.length; i++){
				var missionItem = this.missionItems[this.missionItemsIndex[i]];
				missionItem.callback.call(this,missionItem.args);
			}
		}else if(config.type === "serial"){
			// 发动
			this.complete();
		}
	}
	
};
		
/**
 * 返回模块
 * Hook into commonJS module systems
 */
if (typeof module !== 'undefined' && "exports" in module) {
  exports.MissionsClass = MissionsClass;
}
