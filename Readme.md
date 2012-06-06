任务控制流
===========================
 * 支持串行、并行总线
 * 支持为每个增加任务传参

~~~javascript
/**
 * 创建钩子初始化串行任务流 (↓：串行)
 */
var hookInitMissions = ( new MissionsClass() ).init({
		commitType : "serial",
		completeCallBack : function(){
			
			alert("HOOK INIT COMPLETE\n++++++++++++++++++++++++++++++++");
			alert("++++++++++++++++++++++++++++++++\n ALI F2E LINTS START");
			
			// 钩子初始化任务流结束后 多模块并行检测任务流开始运行
			hookLintsMissions.start();
		}
});
~~~
