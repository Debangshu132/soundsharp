// const electron = require('electron');
const { Tray } = require('electron');


class SoundTray extends Tray{
    constructor(iconsPath,mainWindow){
        super(iconsPath);
        this.mainWindow =mainWindow;
        this.on('click',this.onClick.bind(this));
        this.setToolTip('Sound')
    }
    onClick=(event,bounds)=>{
        const { x,y }=bounds;
    const {height,width }=this.mainWindow.getBounds();

    if(this.mainWindow.isVisible()){
      this.mainWindow.hide()
    }else{
    const yPos=process.platform==='darwin'?y+20:y-height-20;  
    this.mainWindow.setBounds(
      {
        x:x-width/2.5 ,
        y:yPos,
        height,
        width 
      }
    )  
    this.mainWindow.show();}

    }
   
}


module.exports=SoundTray;