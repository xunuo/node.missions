���������
===========================
 * ֧�ִ��С���������
 * ֧��Ϊÿ���������񴫲�

~~~javascript
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
~~~
