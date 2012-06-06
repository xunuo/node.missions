任务控制流
===========================
 * 支持串行、并行总线
 * 支持为每个增加任务传参
 * 能够自由控制任务终结 

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

~~~javascript
// ↓ 获取提交人信息
hookInitMissions.join(function(args){
 
  	// 填充创建目录任务
		var tempDirFullPath = args.tempDirFullPath,
				cmd = 'mkdir -p ' + '"' + tempDirFullPath + '"',
				run = nodeChildProcess.exec(cmd);
		
		// 完成回调
		run.on('exit', function (code) {
			if(code === 0){
		    // alert("temp dir not found, creating : " + tempDirFullPath );
		    buildTempDirMissions.complete();
			}else{
				die('Build Temp Dir Failure : ' + tempDirFullPath);
			}
		});
		
		// 错误处理
		run.stderr.on('data', function (err) {
			die('buildTempDirMissions Error: ' + err);
		});
		
},{tempDirFullPath:tempDirFullPath});

// ↓ 获取提交日志
hookInitMissions.join(function(){
		getCommitLog();
});
~~~

~~~javascript
/**
 * 创建HOOKLINT检测并行任务流 (→：并行)
 */
var hookLintsMissions = ( new MissionsClass() ).init({
		commitType : "paiallel",
		completeCallBack : function(){
			alert("================================\nHook CODA START\n================================");
			hookCodaMissions.start();
		}
});
~~~

~~~javascript
// → 检测文件、目录名
hookLintsMissions.join(function(){
		checkItemsNameMod();
});

// → check chardet
hookLintsMissions.join(function(){
		jschardet = require("jschardet");
		hookLintsMissions.complete();
});
