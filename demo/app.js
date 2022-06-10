/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'Ext.app.Application',
    name: 'Demo',

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },
    // The name of the initial view to create.
    launch : function (){

        var columns = [{xtype : 'rownumberer', width : 50}];

        for(var i=0;i<1000;i++){
            var dataIndex = 'a'+Ext.String.leftPad(i,'3','0');
            columns.push({
               text : dataIndex,
               dataIndex : dataIndex
            });
        }

        var grid = Ext.widget('gridpanel',{
            renderTo : Ext.getBody(),
            height : 1000,
            frame : true,
            title : 'DEMO',
            plugins : [{
                ptype : 'bufferedrenderer',
                scrollToLoadBuffer: 200,
                numFromEdge: 5,
                trailingBufferZone: 15,
                leadingBufferZone : 30,

            }],
            columns : columns,
            store : Ext.create('Ext.data.Store')
        });
        var me = this;

        Ext.Ajax.request({
            url : 'resources/data.json',
            success : function(response){
                var resObj = Ext.decode(response.responseText);
                grid.getStore().loadRawData(resObj);

            }
        })

    }
});
