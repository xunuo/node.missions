���������
===========================
 * ֧�ִ��С���������
 * ֧��Ϊÿ���������񴫲�

	/**
	 * �������ӳ�ʼ������������ (��������)
	 */
	var hookInitMissions = ( new MissionsClass() ).init({
			commitType : "serial",
			completeCallBack : function(){
				
				alert("HOOK INIT COMPLETE\n++++++++++++++++++++++++++++++++");
				alert("++++++++++++++++++++++++++++++++\n ALI F2E LINTS START");
				
				// ���ӳ�ʼ�������������� ��ģ�鲢�м����������ʼ����
				hookLintsMissions.start();
			}
	});
	
	// �� ��ȡ�ύ����Ϣ
	hookInitMissions.join(function(args){
	
    	// ��䴴��Ŀ¼����
			var tempDirFullPath = args.tempDirFullPath,
					cmd = 'mkdir -p ' + '"' + tempDirFullPath + '"',
					run = nodeChildProcess.exec(cmd);
			
			// ��ɻص�
			run.on('exit', function (code) {
				if(code === 0){
			    // alert("temp dir not found, creating : " + tempDirFullPath );
			    buildTempDirMissions.complete();
				}else{
					die('Build Temp Dir Failure : ' + tempDirFullPath);
				}
			});
			
			// ������
			run.stderr.on('data', function (err) {
				die('buildTempDirMissions Error: ' + err);
			});
			
	},{tempDirFullPath:tempDirFullPath});
	
	// �� ��ȡ�ύ��־
	hookInitMissions.join(function(){
			getCommitLog();
	});


	/**
	 * ����HOOKLINT��Ⲣ�������� (��������)
	 */
	var hookLintsMissions = ( new MissionsClass() ).init({
			commitType : "paiallel",
			completeCallBack : function(){
				alert("================================\nHook CODA START\n================================");
				hookCodaMissions.start();
			}
	});

	// �� ����ļ���Ŀ¼��
	hookLintsMissions.join(function(){
			checkItemsNameMod();
	});
	
	// �� check chardet
	hookLintsMissions.join(function(){
			jschardet = require("jschardet");
			hookLintsMissions.complete();
	});
