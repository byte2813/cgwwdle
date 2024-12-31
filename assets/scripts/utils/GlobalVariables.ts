// 全局变量
class GlobalVariables {
    public currentLevel:number = 1;
    public currentFoundElement: number = 0;
    public isFirstLoadGame: boolean = true;
    public ifInitWXCloudData :boolean = false;
    public passLevelArray: Array<number> = [1,0,0,0,0,0];
    public passTimeArray: Array<number> = [999,999,999,999,999,999];
    public openId:string = '';
    public drawsNum:number = 3;
    public awardsArray:Array<number> = [
        0,0,0,0,0
    ];
    public checkInArray: Array<number> = [
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0
    ]
    

    public LevelElementData  = [
        [
            {
                resourcesURL:'coreGameSceneMaterial/image/level1/blackCar',
                position:[-184,-775]
            },
            {
                resourcesURL:'coreGameSceneMaterial/image/level1/boxs',
                position:[-223,-1360]
            },
            {
                resourcesURL:'coreGameSceneMaterial/image/level1/lose',
                position:[-185,-1770]
            },
            {
                resourcesURL:'coreGameSceneMaterial/image/level1/manyBoxs',
                position:[-211,-2196]
            },
            {
                resourcesURL:'coreGameSceneMaterial/image/level1/car',
                position:[-138,-3603]
            },
            
        ],
        [
            {
                resourcesURL:'coreGameSceneMaterial/image/level2/cars',
                position:[-150,-590]
            },
            {
                resourcesURL:'',
                position:[-179,-2100],
                size:[200,350]
            },
            {
                resourcesURL:'coreGameSceneMaterial/image/level2/passBar',
                position:[-100,-2750]
            },
            {
                resourcesURL:'',
                position:[0,-3530],
                size:[500,350]
            },
            {
                resourcesURL:'',
                position:[-40,-3970],
                size:[180,180]
            },
    
        ],
        [
            {
                resourcesURL:'coreGameSceneMaterial/image/level1/blackCar',
                position:[-184,-775]
            },
            {
                resourcesURL:'coreGameSceneMaterial/image/level1/boxs',
                position:[-223,-1360]
            },
            {
                resourcesURL:'coreGameSceneMaterial/image/level1/lose',
                position:[-185,-1770]
            },
            {
                resourcesURL:'coreGameSceneMaterial/image/level1/manyBoxs',
                position:[-211,-2196]
            },
            {
                resourcesURL:'coreGameSceneMaterial/image/level1/car',
                position:[-138,-3603]
            },
            
        ],
        [
            {
                resourcesURL:'coreGameSceneMaterial/image/level1/blackCar',
                position:[-184,-775]
            },
            {
                resourcesURL:'coreGameSceneMaterial/image/level1/boxs',
                position:[-223,-1360]
            },
            {
                resourcesURL:'coreGameSceneMaterial/image/level1/lose',
                position:[-185,-1770]
            },
            {
                resourcesURL:'coreGameSceneMaterial/image/level1/manyBoxs',
                position:[-211,-2196]
            },
            {
                resourcesURL:'coreGameSceneMaterial/image/level1/car',
                position:[-138,-3603]
            },
            
        ],
        [
            {
                resourcesURL:'coreGameSceneMaterial/image/level1/blackCar',
                position:[-184,-775]
            },
            {
                resourcesURL:'coreGameSceneMaterial/image/level1/boxs',
                position:[-223,-1360]
            },
            {
                resourcesURL:'coreGameSceneMaterial/image/level1/lose',
                position:[-185,-1770]
            },
            {
                resourcesURL:'coreGameSceneMaterial/image/level1/manyBoxs',
                position:[-211,-2196]
            },
            {
                resourcesURL:'coreGameSceneMaterial/image/level1/car',
                position:[-138,-3603]
            },
            
        ]
    ]
}
export let globalVariables: GlobalVariables = new GlobalVariables();
