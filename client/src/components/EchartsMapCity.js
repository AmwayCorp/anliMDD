import React, { Component, Fragment } from 'react'

import echarts from 'echarts';
import "echarts/lib/chart/line";
import "echarts/map/js/china";
import oneMapGreenCircular from "../styles/assets/oneMapGreenCircular.png"
import oneMapRedCircular from "../styles/assets/oneMapRedCircular.png"
import oneMapUp from "../styles/assets/oneMapUp.png"
import oneMapDown from "../styles/assets/oneMapDown.png"


export default class EchartsMapCity extends Component {
    constructor() {
        super();
        this.state = {
            isPerfYear: false,
            list: [
                //地图高亮显示
                { name: "安徽", value: 1, color: "#f5f5f6" },
                { name: "北京", value: 1, color: "#f5f5f6" },
                { name: "甘肃", value: 1, color: "#f5f5f6" },
                { name: "河北", value: 1, color: "#f5f5f6" },
                { name: "河南", value: 1, color: "#f5f5f6" },
                { name: "黑龙江", value: 1, color: "#f5f5f6" },
                { name: "湖北", value: 1, color: "#f5f5f6" },
                { name: "吉林", value: 1, color: "#f5f5f6" },
                { name: "辽宁", value: 1, color: "#f5f5f6" },
                { name: "内蒙古", value: 1, color: "#f5f5f6" },
                { name: "宁夏", value: 1, color: "#f5f5f6" },
                { name: "青海", value: 1, color: "#f5f5f6" },
                { name: "山东", value: 1, color: "#f5f5f6" },
                { name: "山西", value: 1, color: "#f5f5f6" },
                { name: "陕西", value: 1, color: "#f5f5f6" },
                { name: "天津", value: 1, color: "#f5f5f6" },
                { name: "新疆", value: 1, color: "#f5f5f6" }
            ],
            cityClusterAll: [],
            maxMinCity: [],
            bigSmallShow: 0,
        }
    }
    render() {
        var { isPerfYear } = this.state
        return (
            <Fragment>
                <div className="mapTitle">YTD sales by city cluster <span style={{ fontSize: "12px" }}>{isPerfYear ? '(By Performance Year)' : '(By Calendar Year)'}</span></div>
                <div style={{display:"flex"}}>
                    <div id="map" className="centerItem"></div>
                </div>
                <ul className="oneMapTuLiUl">
                    <li style={{ color: "#16b6aa" }}>
                        <img src={oneMapGreenCircular} />
                        <div>Better <span style={{ color: '#333' }}>vs ACCL</span></div>
                        <img src={oneMapUp} />
                    </li>
                    <li style={{ color: "#eb5652" }}>
                        <img src={oneMapRedCircular} />
                        <div>Worse <span style={{ color: '#333' }}>vs ACCL</span></div>
                        <img src={oneMapDown} />
                    </li>
                    <li style={{ color: "#16b6aa" }}>
                        <span>City cluster</span>
                        <div>Better <span style={{ color: '#333' }}>vs SPLY</span></div>
                        <img src={oneMapUp} />
                    </li>
                    <li style={{ color: "#eb5652" }}>
                        <span>City cluster</span>
                        <div>Worse <span style={{ color: '#333' }}>vs SPLY</span></div>
                        <img src={oneMapDown} />
                    </li>
                </ul>
            </Fragment>
        )
    }
    componentWillReceiveProps(nextProps) {
        // var {data} = nextProps
        this.setState({

        }, () => {
            this.dataUpdateMap()
        })
    }
    componentDidMount() {
        this.dataUpdateMap()
    }
    dataUpdateMap() {
        var data = this.props.data
        // console.log(data)
        var isPerfYear = data.isPerfYear
        var cityClusterAll = data.data
        var bigSmallShow = (this.props.bigSmall.percentVal2 - 100) || 0
        // console.log(bigSmallShow)
        // console.log(cityClusterAll)
        // 冒泡排序
        // for(var i=0;i<cityClusterAll.length-1;i++){
        //     for(var j=0;j<cityClusterAll.length-i-1;j++){
        //       //交换位置
        //       if(cityClusterAll[j].actual_sales_sum>cityClusterAll[j+1].actual_sales_sum){
        // 　　　　　var temp=cityClusterAll[j].actual_sales_sum;
        // 　　　　　cityClusterAll[j].actual_sales_sum=cityClusterAll[j+1].actual_sales_sum;
        // 　　　　　cityClusterAll[j+1].actual_sales_sum=temp;
        // 　　  }
        //   }
        // }
        var maxMinCity = []
        for (var i = 0; i < cityClusterAll.length; i++) {
            if (i < 5 || i >= (cityClusterAll.length - 5)) {
                maxMinCity.push(cityClusterAll[i])
            }
        }
        // console.log(maxMinCity)
        this.setState({
            cityClusterAll, maxMinCity, bigSmallShow, isPerfYear
        }, () => {
            this.echartsShows(); //执行echarts地图展示
        })
    }
    echartsShows() {
        var mapName = "china"; //中国地图，可以不写变量直接在下面申明"china"
        var max = 480,
            min = 9; // todo
        var maxSize4Pin = 100,
            minSize4Pin = 20;
        var geoCoordMap = {
            //自定义城市坐标
            上海城市群: [121.487899486, 31.24916171],
            临沧城市群: [100.092612914, 23.8878061038],
            丽江城市群: [100.229628399, 26.8753510895],
            保山城市群: [99.1779956133, 25.1204891962],
            大理白族自治州城市群: [100.223674789, 25.5968996394],
            德宏傣族景颇族自治州城市群: [98.5894342874, 24.441239663],
            怒江傈僳族自治州城市群: [98.8599320425, 25.8606769782],
            文山壮族苗族自治州城市群: [104.246294318, 23.3740868504],
            昆明城市群: [102.714601139, 25.0491531005],
            昭通城市群: [103.725020656, 27.3406329636],
            普洱城市群: [100.98005773, 22.7887777801],
            曲靖城市群: [103.782538888, 25.5207581429],
            楚雄彝族自治州城市群: [101.529382239, 25.0663556742],
            玉溪城市群: [102.545067892, 24.3704471344],
            红河哈尼族彝族自治州城市群: [103.384064757, 23.3677175165],
            西双版纳傣族自治州城市群: [100.803038275, 22.0094330022],
            迪庆藏族自治州城市群: [99.7136815989, 27.8310294612],
            乌兰察布城市群: [113.112846391, 41.0223629468],
            乌海城市群: [106.831999097, 39.6831770068],
            兴安盟城市群: [122.048166514, 46.0837570652],
            包头城市群: [109.846238532, 40.6471194257],
            呼伦贝尔城市群: [119.760821794, 49.2016360546],
            呼和浩特城市群: [111.66035052, 40.8283188731],
            巴彦淖尔城市群: [107.42380672, 40.7691799024],
            赤峰城市群: [118.930761192, 42.2971123203],
            通辽城市群: [122.260363263, 43.633756073],
            鄂尔多斯城市群: [109.993706251, 39.8164895606],
            锡林郭勒盟城市群: [116.027339689, 43.9397048423],
            阿拉善盟城市群: [105.695682871, 38.8430752644],
            北京城市群: [116.395645038, 39.9299857781],
            台中城市群: [119.337634104, 26.0911937119],
            台北城市群: [114.130474436, 22.3748329286],
            台南城市群: [121.360525873, 38.9658447898],
            嘉义城市群: [114.246701335, 22.7288657203],
            高雄城市群: [111.590952812, 21.9464822541],
            吉林城市群: [126.564543989, 43.8719883344],
            四平城市群: [124.391382074, 43.1755247011],
            延边朝鲜族自治州城市群: [129.485901958, 42.8964136037],
            松原城市群: [124.832994532, 45.1360489701],
            白城城市群: [122.840776679, 45.6210862752],
            白山城市群: [126.435797675, 41.945859397],
            辽源城市群: [125.133686052, 42.9233026191],
            通化城市群: [125.942650139, 41.7363971299],
            长春城市群: [125.313642427, 43.8983376071],
            乐山城市群: [103.760824239, 29.6009576111],
            内江城市群: [105.073055992, 29.5994615348],
            凉山彝族自治州城市群: [102.259590803, 27.8923929037],
            南充城市群: [106.105553984, 30.8009651682],
            宜宾城市群: [104.633019062, 28.7696747963],
            巴中城市群: [106.757915842, 31.8691891592],
            广元城市群: [105.81968694, 32.4410401584],
            广安城市群: [106.635720331, 30.4639838879],
            德阳城市群: [104.402397818, 31.1311396527],
            成都城市群: [104.067923463, 30.6799428454],
            攀枝花城市群: [101.722423152, 26.5875712571],
            泸州城市群: [105.443970289, 28.8959298039],
            甘孜藏族自治州城市群: [101.969232063, 30.0551441144],
            眉山城市群: [103.841429563, 30.0611150799],
            绵阳城市群: [104.705518975, 31.5047012581],
            自贡城市群: [104.776071339, 29.3591568895],
            资阳城市群: [104.635930302, 30.132191434],
            达州城市群: [107.494973447, 31.2141988589],
            遂宁城市群: [105.564887792, 30.5574913504],
            阿坝藏族羌族自治州城市群: [102.228564689, 31.9057628583],
            雅安城市群: [103.009356466, 29.9997163371],
            天津城市群: [117.210813092, 39.1439299033],
            中卫城市群: [105.196754199, 37.5211241916],
            吴忠城市群: [106.208254199, 37.9935610029],
            固原城市群: [106.285267996, 36.0215234807],
            石嘴山城市群: [106.379337202, 39.0202232836],
            银川城市群: [106.206478608, 38.5026210119],
            亳州城市群: [115.787928245, 33.8712105653],
            六安城市群: [116.505252683, 31.7555583552],
            合肥城市群: [117.282699092, 30.8669422607],
            安庆城市群: [117.058738772, 30.5378978174],
            宣城城市群: [118.752096311, 30.9516423543],
            宿州城市群: [116.988692412, 33.6367723858],
            池州城市群: [117.494476772, 30.6600192482],
            淮北城市群: [116.791447429, 33.9600233054],
            淮南城市群: [117.018638863, 32.6428118237],
            滁州城市群: [118.324570351, 32.3173505954],
            芜湖城市群: [118.384108423, 31.3660197875],
            蚌埠城市群: [117.357079866, 32.9294989067],
            铜陵城市群: [117.819428729, 30.9409296947],
            阜阳城市群: [115.820932259, 32.9012113306],
            马鞍山城市群: [118.515881847, 31.6885281589],
            黄山城市群: [118.293569632, 29.7344348562],
            东营城市群: [118.583926333, 37.4871211553],
            临沂城市群: [118.340768237, 35.0724090744],
            威海城市群: [122.093958366, 37.5287870813],
            德州城市群: [116.328161364, 37.4608259263],
            日照城市群: [119.507179943, 35.4202251931],
            枣庄城市群: [117.279305383, 34.8078830784],
            泰安城市群: [117.089414917, 36.1880777589],
            济南城市群: [117.024967066, 36.6827847272],
            济宁城市群: [116.600797625, 35.4021216643],
            淄博城市群: [118.059134278, 36.8046848542],
            滨州城市群: [117.968292415, 37.4053139418],
            潍坊城市群: [119.142633823, 36.7161148731],
            烟台城市群: [121.30955503, 37.5365615629],
            聊城城市群: [115.986869139, 36.4558285147],
            莱芜城市群: [117.684666912, 36.2336541336],
            菏泽城市群: [115.463359775, 35.2624404961],
            青岛城市群: [120.384428184, 36.1052149013],
            临汾城市群: [111.538787596, 36.0997454436],
            吕梁城市群: [111.143156602, 37.527316097],
            大同城市群: [113.290508673, 40.1137444997],
            太原城市群: [111.550863589, 36.890277054],
            忻州城市群: [112.727938829, 38.461030573],
            晋中城市群: [112.7385144, 37.6933615268],
            晋城城市群: [112.867332758, 35.4998344672],
            朔州城市群: [112.479927727, 39.3376719662],
            运城城市群: [111.006853653, 35.0388594798],
            长治城市群: [113.120292086, 36.2016643857],
            阳泉城市群: [113.569237602, 37.8695294932],
            东莞城市群: [113.763433991, 23.0430238154],
            中山城市群: [113.422060021, 22.5451775145],
            云浮城市群: [112.050945959, 22.9379756855],
            佛山城市群: [113.134025635, 23.0350948405],
            广州城市群: [114.307649675, 24.1200491021],
            惠州城市群: [114.41065808, 23.1135398524],
            揭阳城市群: [116.379500855, 23.5479994669],
            梅州城市群: [116.126403098, 24.304570606],
            汕头城市群: [116.728650288, 23.3839084533],
            汕尾城市群: [115.372924289, 22.7787305002],
            江门城市群: [113.078125341, 22.5751167835],
            河源城市群: [114.713721476, 23.7572508505],
            深圳城市群: [114.025973657, 22.5460535462],
            清远城市群: [113.040773349, 23.6984685504],
            湛江城市群: [110.365067263, 21.2574631038],
            潮州城市群: [116.630075991, 23.6618116765],
            珠海城市群: [113.562447026, 22.2569146461],
            肇庆城市群: [112.47965337, 23.0786632829],
            茂名城市群: [110.931245331, 21.6682257188],
            阳江城市群: [111.977009756, 21.8715173045],
            韶关城市群: [113.594461107, 24.8029603119],
            北海城市群: [109.122627919, 21.472718235],
            南宁城市群: [108.297233556, 22.8064929356],
            崇左城市群: [107.357322038, 22.4154552965],
            来宾城市群: [109.231816505, 23.7411659265],
            柳州城市群: [109.42240181, 24.3290533525],
            桂林城市群: [110.260920147, 25.262901246],
            梧州城市群: [111.30547195, 23.4853946367],
            河池城市群: [108.069947709, 24.6995207829],
            玉林城市群: [110.151676316, 22.6439736084],
            百色城市群: [106.631821404, 23.9015123679],
            贵港城市群: [109.613707557, 23.1033731644],
            贺州城市群: [111.552594179, 24.4110535471],
            钦州城市群: [108.638798056, 21.9733504653],
            防城港城市群: [108.351791153, 21.6173984705],
            乌鲁木齐城市群: [87.5649877411, 43.8403803472],
            伊犁哈萨克自治州城市群: [81.2978535304, 43.9222480963],
            克孜勒苏柯尔克孜自治州城市群: [76.1375644775, 39.7503455778],
            克拉玛依城市群: [84.8811801861, 45.5943310667],
            博尔塔拉蒙古自治州城市群: [82.0524362672, 44.9136513743],
            吐鲁番地区城市群: [89.1815948657, 42.9604700169],
            和田地区城市群: [79.9302386372, 37.1167744927],
            哈密地区城市群: [93.5283550928, 42.8585963324],
            喀什地区城市群: [75.9929732675, 39.4706271887],
            塔城地区城市群: [82.9748805837, 46.7586836297],
            昌吉回族自治州城市群: [87.2960381257, 44.0070578985],
            自治区直辖城市群: [85.6148993383, 42.1270009576],
            阿克苏地区城市群: [80.2698461793, 41.1717309015],
            阿勒泰地区城市群: [88.1379154871, 47.8397444862],
            南京城市群: [118.478074408, 32.0572355018],
            南通城市群: [120.873800951, 32.0146645408],
            宿迁城市群: [118.296893379, 33.9520497337],
            常州城市群: [119.981861013, 31.7713967447],
            徐州城市群: [117.188106623, 34.2715534311],
            扬州城市群: [119.427777551, 32.4085052546],
            无锡城市群: [120.305455901, 31.5700374519],
            泰州城市群: [119.919606016, 32.4760532748],
            淮安城市群: [119.030186365, 33.6065127393],
            盐城城市群: [120.148871818, 33.3798618771],
            苏州城市群: [120.619907115, 31.317987368],
            连云港城市群: [119.173872217, 34.601548967],
            镇江城市群: [119.455835405, 32.2044094436],
            上饶城市群: [117.955463877, 28.4576225539],
            九江城市群: [115.999848022, 29.7196395261],
            南昌城市群: [115.893527546, 28.6895780001],
            吉安城市群: [114.992038711, 27.1138476502],
            宜春城市群: [114.400038672, 27.8111298958],
            抚州城市群: [116.360918867, 27.9545451703],
            新余城市群: [114.947117417, 27.8223215586],
            景德镇城市群: [117.186522625, 29.3035627684],
            萍乡城市群: [113.859917033, 27.639544223],
            赣州城市群: [114.935909079, 25.8452955363],
            鹰潭城市群: [117.035450186, 28.2413095972],
            保定城市群: [115.494810169, 38.886564548],
            唐山城市群: [118.183450598, 39.6505309225],
            廊坊城市群: [116.703602223, 39.5186106251],
            张家口城市群: [114.89378153, 40.8111884911],
            承德城市群: [117.933822456, 40.9925210525],
            沧州城市群: [116.863806476, 38.2976153503],
            石家庄城市群: [114.522081844, 38.0489583146],
            秦皇岛城市群: [119.604367616, 39.9454615659],
            衡水城市群: [115.686228653, 37.7469290459],
            邢台城市群: [114.520486813, 37.0695311969],
            邯郸城市群: [114.482693932, 36.6093079285],
            三门峡城市群: [111.181262093, 34.7833199411],
            信阳城市群: [114.085490993, 32.1285823075],
            南阳城市群: [112.542841901, 33.0114195691],
            周口城市群: [114.654101942, 33.6237408181],
            商丘城市群: [115.641885688, 34.4385886402],
            安阳城市群: [114.351806508, 36.1102667222],
            平顶山城市群: [113.300848978, 33.7453014565],
            开封城市群: [114.351642118, 34.8018541758],
            新乡城市群: [113.912690161, 35.3072575577],
            洛阳城市群: [112.447524769, 35.6573678177],
            漯河城市群: [114.0460614, 33.5762786885],
            濮阳城市群: [115.026627441, 35.7532978882],
            焦作城市群: [113.211835885, 35.234607555],
            省直辖城市群: [113.486804058, 34.157183768],
            许昌城市群: [113.83531246, 34.0267395887],
            郑州城市群: [113.64964385, 34.7566100641],
            驻马店城市群: [114.049153547, 32.9831581541],
            鹤壁城市群: [114.297769838, 35.7554258742],
            丽水城市群: [119.929575843, 28.4562995521],
            台州城市群: [121.440612936, 28.6682832857],
            嘉兴城市群: [120.760427699, 30.7739922396],
            宁波城市群: [121.579005973, 29.8852589659],
            杭州城市群: [120.219375416, 30.2592444615],
            温州城市群: [120.690634734, 28.002837594],
            湖州城市群: [120.137243163, 30.8779251557],
            绍兴城市群: [120.592467386, 30.0023645805],
            舟山城市群: [122.169872098, 30.0360103026],
            衢州城市群: [118.875841652, 28.9569104475],
            金华城市群: [119.652575704, 29.1028991054],
            三亚城市群: [109.522771281, 18.2577759149],
            三沙城市群: [112.350383075, 16.840062894],
            海口城市群: [110.330801848, 20.022071277],
            省直辖城市群: [109.733755488, 19.1805008013],
            十堰城市群: [110.801228917, 32.6369943395],
            咸宁城市群: [114.300060592, 29.8806567577],
            孝感城市群: [113.935734392, 30.9279547842],
            宜昌城市群: [111.310981092, 30.732757818],
            恩施土家族苗族自治州城市群: [109.491923304, 30.2858883166],
            武汉城市群: [114.316200103, 30.5810841269],
            省直辖城市群: [112.410562192, 31.2093162501],
            荆州城市群: [112.241865807, 30.332590523],
            荆门城市群: [112.217330299, 31.0426112029],
            襄阳城市群: [112.250092848, 32.2291685915],
            鄂州城市群: [114.895594041, 30.3844393228],
            随州城市群: [113.379358364, 31.7178576082],
            黄冈城市群: [114.906618047, 30.4461089379],
            黄石城市群: [115.050683164, 30.2161271277],
            娄底城市群: [111.996396357, 27.7410733023],
            岳阳城市群: [113.146195519, 29.3780070755],
            常德城市群: [111.653718137, 29.0121488552],
            张家界城市群: [110.481620157, 29.1248893532],
            怀化城市群: [109.986958796, 27.5574829012],
            株洲城市群: [113.131695341, 27.8274329277],
            永州城市群: [111.614647686, 26.4359716468],
            湘潭城市群: [112.935555633, 27.835095053],
            湘西土家族苗族自治州城市群: [109.7457458, 28.3179507937],
            益阳城市群: [112.366546645, 28.5880877799],
            衡阳城市群: [112.583818811, 26.8981644154],
            邵阳城市群: [111.461525404, 27.2368112449],
            郴州城市群: [113.037704468, 25.7822639757],
            长沙城市群: [112.979352788, 28.2134782309],
            无堂区划分区域城市群: [113.557519102, 22.2041179884],
            澳门半岛城市群: [113.566432335, 22.1950041592],
            澳门离岛城市群: [113.557519102, 22.2041179884],
            临夏回族自治州城市群: [103.215249178, 35.5985143488],
            兰州城市群: [103.823305441, 36.064225525],
            嘉峪关城市群: [98.2816345853, 39.8023973267],
            天水城市群: [105.736931623, 34.5843194189],
            定西城市群: [104.626637601, 35.5860562418],
            平凉城市群: [106.688911157, 35.55011019],
            庆阳城市群: [107.644227087, 35.7268007545],
            张掖城市群: [100.459891869, 38.939320297],
            武威城市群: [102.640147343, 37.9331721429],
            甘南藏族自治州城市群: [102.917442486, 34.9922111784],
            白银城市群: [104.171240904, 36.5466817062],
            酒泉城市群: [98.5084145062, 39.7414737682],
            金昌城市群: [102.208126263, 38.5160717995],
            陇南城市群: [104.934573406, 33.3944799729],
            三明城市群: [117.642193934, 26.2708352794],
            南平城市群: [118.181882949, 26.6436264742],
            厦门城市群: [118.103886046, 24.4892306125],
            宁德城市群: [119.54208215, 26.6565274192],
            泉州城市群: [118.600362343, 24.901652384],
            漳州城市群: [117.676204679, 24.5170647798],
            福州城市群: [119.330221107, 26.0471254966],
            莆田城市群: [119.077730964, 25.4484501367],
            龙岩城市群: [117.017996739, 25.0786854335],
            山南地区城市群: [91.7506438744, 29.2290269317],
            拉萨城市群: [91.111890896, 29.6625570621],
            日喀则地区城市群: [88.8914855677, 29.2690232039],
            昌都地区城市群: [97.18558158, 31.1405756319],
            林芝地区城市群: [94.3499854582, 29.6669406258],
            那曲地区城市群: [92.0670183689, 31.4806798301],
            阿里地区城市群: [81.1076686895, 30.4045565883],
            六盘水城市群: [104.85208676, 26.5918660603],
            安顺城市群: [105.928269966, 26.2285945777],
            毕节城市群: [105.333323371, 27.4085621313],
            贵阳城市群: [106.709177096, 26.6299067414],
            遵义城市群: [106.931260316, 27.6999613771],
            铜仁城市群: [109.168558028, 27.6749026906],
            黔东南苗族侗族自治州城市群: [107.985352573, 26.5839917665],
            黔南布依族苗族自治州城市群: [107.52320511, 26.2645359974],
            黔西南布依族苗族自治州城市群: [104.900557798, 25.0951480559],
            丹东城市群: [124.338543115, 40.1290228266],
            大连城市群: [121.593477781, 38.9487099383],
            抚顺城市群: [123.929819767, 41.8773038296],
            朝阳城市群: [120.446162703, 41.5718276679],
            本溪城市群: [123.77806237, 41.3258376266],
            沈阳城市群: [123.432790922, 41.8086447835],
            盘锦城市群: [122.07322781, 41.141248023],
            营口城市群: [122.233391371, 40.6686510665],
            葫芦岛城市群: [120.860757645, 40.7430298813],
            辽阳城市群: [123.172451205, 41.2733392656],
            铁岭城市群: [123.854849615, 42.2997570121],
            锦州城市群: [121.147748738, 41.1308788759],
            阜新城市群: [121.660822129, 42.0192501071],
            鞍山城市群: [123.007763329, 41.1187436822],
            重庆城市群: [106.530635013, 29.5446061089],
            咸阳城市群: [108.707509278, 34.345372996],
            商洛城市群: [109.934208154, 33.8739073951],
            安康城市群: [109.038044563, 32.70437045],
            宝鸡城市群: [107.170645452, 34.3640808097],
            延安城市群: [109.500509757, 36.6033203523],
            榆林城市群: [109.745925744, 38.2794392401],
            汉中城市群: [107.045477629, 33.0815689782],
            渭南城市群: [109.483932697, 34.5023579758],
            西安城市群: [108.953098279, 34.2777998978],
            铜川城市群: [108.968067013, 34.9083676964],
            果洛藏族自治州城市群: [100.223722769, 34.4804845846],
            海东地区城市群: [102.085206987, 36.5176101677],
            海北藏族自治州城市群: [100.879802174, 36.9606541011],
            海南藏族自治州城市群: [100.624066094, 36.2843638038],
            海西蒙古族藏族自治州城市群: [97.3426254153, 37.3737990706],
            玉树藏族自治州城市群: [97.0133161374, 33.0062399097],
            西宁城市群: [101.76792099, 36.640738612],
            黄南藏族自治州城市群: [102.007600308, 35.5228515517],
            九龙城市群: [114.173291988, 22.3072458588],
            新界城市群: [114.146701965, 22.4274312754],
            香港岛城市群: [114.183870524, 22.2721034276],
            七台河城市群: [131.019048047, 45.7750053686],
            伊春城市群: [128.910765978, 47.7346850751],
            佳木斯城市群: [130.284734586, 46.8137796047],
            双鸭山城市群: [131.17140174, 46.6551020625],
            哈尔滨城市群: [126.657716855, 45.7732246332],
            大兴安岭地区城市群: [124.19610419, 51.991788968],
            大庆城市群: [125.02183973, 46.59670902],
            牡丹江城市群: [129.608035396, 44.5885211528],
            绥化城市群: [126.989094572, 46.646063927],
            鸡西城市群: [130.941767273, 45.3215398866],
            鹤岗城市群: [130.292472051, 47.3386659037],
            黑河城市群: [127.500830295, 50.2506900907],
            齐齐哈尔城市群: [123.987288942, 47.3476998134]
        };
        var mapFeatures = echarts.getMap(mapName).geoJson.features; //获取地图数据
        mapFeatures.forEach(function (v) {
            var name = v.properties.name; // 地区名称
            geoCoordMap[name] = v.properties.cp; // 地区经纬度
        });
        // var {cityClusterAll} = this.state
        // cityClusterAll.sort((a, b) => {
        //     let geoCoordA = geoCoordMap[a.city_cluster],
        //         geoCoordB = geoCoordMap[b.city_cluster];
        //     a = geoCoordA && geoCoordA[1] || 0;
        //     b = geoCoordB && geoCoordB[1] || 0;
        //     return b - a;
        // });
        // 次数最多的红色标记和时间最长的黄色标记
        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].city_cluster];
                if (geoCoord) {
                    res.push({
                        name: data[i].city_cluster,
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
            return res;
        };
        // 空中的线
        var convertData1 = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var fromCoord = geoCoordMap[data[i].name]; //获取城市的坐标 source
                var toCoord = geoCoordMap[data[i].value]; //获取城市的坐标 destination
                if (fromCoord && toCoord) {
                    res.push({
                        fromName: data[i].name,
                        toName: data[i].value,
                        coords: [fromCoord, toCoord]
                    });
                }
            }
            return res;
        };
        // 线下面的底盘
        var convertData2 = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].city_cluster];
                var geoCoord1 = geoCoordMap[data[i].value];
                if (geoCoord) {
                    res.push({
                        name: data[i].city_cluster,
                        value: geoCoord.concat(data[i].value)
                    });
                }
                if (geoCoord1) {
                    res.push({
                        name: data[i].value,
                        value: geoCoord1.concat(data[i].city_cluster)
                    });
                }
            }
            return res;
        };

        // 城市群数据转换
        var convertData3 = function (data) {
            //改变原数组的排序，按经纬度来排
            data.sort((a, b) => {
                let geoCoordA = geoCoordMap[a.city_cluster],
                    geoCoordB = geoCoordMap[b.city_cluster];
                a = geoCoordA && geoCoordA[1] || 0;
                b = geoCoordB && geoCoordB[1] || 0;
                return b - a;
            });
            let xyFlag = 1,
                array = [];
            data.forEach(({ city_cluster: name }) => {
                let geoCoord = geoCoordMap[name];
                if (!geoCoord) return false;
                let showLabel = data.every(({ city_cluster: itemName }) => {
                    if (name === itemName) return true;
                    let itemGeoCoord = geoCoordMap[itemName];
                    if (!itemGeoCoord) return true;
                    let x = Math.abs(geoCoord[0] - itemGeoCoord[0]),
                        y = Math.abs(geoCoord[1] - itemGeoCoord[1]),
                        distance = Math.sqrt(Math.pow(x, 1) + Math.pow(y, 1));
                    return distance >= xyFlag;
                });
                array.push({
                    name,
                    value: [...geoCoord],
                    label: {
                        fontSize: 10,
                        //控制地图上显示的字体的颜色的变化
                        //     color: (params)=>{
                        //     var splySales = 0;
                        //     if (this.state.cityClusterAll && this.state.cityClusterAll.length > 0) {
                        //         for (var i = 0; i < this.state.cityClusterAll.length; i++) {
                        //             if (this.state.cityClusterAll[i].city_cluster === params.name) {
                        //                 splySales = this.state.cityClusterAll[i].sales_vs_sply
                        //             }
                        //         }
                        //     }
                        //     if (splySales) {
                        //         splySales = splySales.replace(/%/g, '')
                        //         if (Number(splySales) >= 0) {
                        //             return "#16b6aa"
                        //         } else {
                        //             return "#ff0025"
                        //         }
                        //     }
                        // }, 
                        shows: showLabel, show: false
                    }//这个show代表地图的名字是否显示
                });
            });
            //改变回来排序，按大小来排
            data.sort((a, b) => {
                return b.actual_sales_sum - a.actual_sales_sum;
            });
            return array;
        }
        // 城市群牵引线数据转换
        var convertData4 = function (data) {
            data = JSON.parse(JSON.stringify(data));
            let flag = 113,
                latitude = [
                    {
                        flag: 28,
                        pointX: 122,
                        pointY: 26.5,
                        getPoint() {
                            return [this.pointX -= 1.2, this.pointY -= 1]
                        }
                    },
                    {
                        flag: 33,
                        pointX: 120.6,
                        pointY: 35.3,
                        getPoint() {
                            return [this.pointX += 1, this.pointY -= 1.5]
                        }
                    },
                    {
                        flag: 35,
                        pointX: 113.1,
                        pointY: 33.2,
                        extend(object) {
                            object.label = { align: 'right' };
                        },
                        getPoint() {
                            return [this.pointX, this.pointY];
                        }
                    },
                    {
                        flag: 39,
                        pointX: 114,
                        pointY: 37.4,
                        extend(object) {
                            object.label = { align: 'right' };
                        },
                        getPoint() {
                            return [this.pointX, this.pointY];
                        }
                    },
                    {
                        flag: 50,
                        pointX: 115,
                        pointY: 43,
                        getPoint() {
                            return [this.pointX += 1.2, this.pointY -= 1.2];
                        }
                    }
                ]
            var array = [];
            data.forEach(({ label, name, value }) => {
                let [pointX, pointY] = value;
                var object = { name, coords: [[...value]] };
                if (label.shows) {
                    object.label = {
                        align: 'left'
                    };
                    object.coords.push([pointX += 0.6, pointY += 0]);
                } else {
                    if (pointX <= flag) {
                        object.label = { align: 'right' };
                        object.coords.push([pointX -= 1.4, pointY += 0.6]);
                    } else {
                        let point = latitude.find(item => item.flag >= pointY);
                        point.extend && point.extend(object);
                        object.coords.push(point.getPoint());
                    }
                }
                array.push(object);
            });
            // console.log(array)
            return array;
        }
        /*获取地图数据*/
        // var mapEchartsWidth = document.getElementById("map");
        var myChartMapEchartsWidth = document.getElementById('map')
        myChartMapEchartsWidth.style.width = (window.innerWidth * 0.63) + "px"
        var myChartMap = echarts.init(document.getElementById("map"));
        window.addEventListener('resize', function () {
            myChartMap.resize()
        });
        var option = {
            // 地图颜色渐变
            visualMap: {
                show: false, //是否展示地图颜色渐变控件
                type: "piecewise", //
                borderWidth: 0,                               //边框线宽
                seriesIndex: 0, //指定取哪个系列的数据，即哪个系列的 series.data,默认取所有系列
                pieces: this.state.list, //把颜色写在this.list数组中，所以可以在这里进行渲染
            },
            // 上面显示的坐标点
            geo: {
                show: true,
                map: mapName,
                // regions: [{
                //     name: '广东',
                //     itemStyle: {
                //         areaColor: 'red',
                //         color: 'red'
                //     }
                // }],
                aspectScale: 0.75, //长宽比
                // zoom: 1.2,
                // // 去掉南海岛
                // regions: [
                //   {
                //     name: "南海诸岛",
                //     value: 0,
                //     itemStyle: {
                //       normal: {
                //         opacity: 0,
                //         label: {
                //           show: false
                //         }
                //       }
                //     }
                //   }
                // ],
                label: {
                    normal: {
                        show: false //是否显示地名
                    },
                    emphasis: {
                        show: false //是否显示鼠标划过时的显示
                    }
                },
                roam: false, //地图可放大缩小
                itemStyle: {
                    normal: {
                        areaColor: "#fceaea", //地图默认的地区颜色
                        borderColor: "#ffe3ad", //地图直接的那个黑线边的颜色
                        // shadowColor: 'red',
                        // shadowBlur: 1,
                        borderWidth: 5,//设置外层边框
                    },
                },
            },
            tooltip: {
                //                     //不显示提示标签
                show: true,
                // city_cluster: "杭州城市群"
                // actual_sales_sum: 118605668.12960227
                // perc_of_actual_sales: "5.6 %"
                // sales_vs_sply: "-4.4 %"
                // maxYear: 2019
                formatter: (data) => {
                    var name = "";
                    var number = "";
                    var actualSales = "";
                    var splySales = ""
                    if (this.state.cityClusterAll && this.state.cityClusterAll.length > 0) {
                        for (var i = 0; i < this.state.cityClusterAll.length; i++) {
                            if (this.state.cityClusterAll[i].city_cluster === data.name) {
                                name = this.state.cityClusterAll[i].city_cluster;
                                number = this.state.cityClusterAll[i].actual_sales_sum;
                                actualSales = this.state.cityClusterAll[i].perc_of_actual_sales;
                                splySales = this.state.cityClusterAll[i].sales_vs_sply
                            }
                        }
                    }
                    number = Math.round((number || 0) / 1000000)
                    if (splySales) {
                        splySales = splySales.replace(/%/g, '')
                        if (Number(splySales) >= 0) {
                            splySales = "<span style='color:#16b6aa'>" + "+" + Number(splySales).toFixed(1) + "%" + "</span>"
                        } else {
                            splySales = "<span style='color:#eb5652'>" + Number(splySales).toFixed(1) + "%" + "</span>"
                        }
                    }
                    if (data.componentIndex >= 1) {
                        //     return "Top1:" + data.name
                        return "<div style='border-bottom:1px solid #ffffff'>" + name + "</div>" + "YTD Sales:" + number + "m" + "<br/>" + "% of total sales:" + actualSales + "<br/>" + "Sales vs SPLY:" + splySales
                    }
                    // console.log(data)
                }, //提示标签格式
                backgroundColor: "rgba(0,0,0,0.72)",//提示标签背景颜色
                textStyle: { color: "#ffffff" } //提示标签字体颜色
            },
            series: [
                {
                    type: "map",
                    map: mapName,
                    // geoIndex: 0,//地图颜色
                    aspectScale: 0.75, //长宽比
                    showLegendSymbol: false, // 存在legend时显示
                    label: {
                        normal: {
                            show: false //是否显示地名
                        }
                    },
                    // markPoint:{
                    itemStyle: {
                        normal: {
                            borderWidth: 0
                        },
                    },
                    // },
                    itemStyle: {
                        normal: {
                            areaColor: "#fceaea", //地图默认的地区颜色
                            borderColor: "#ffe3ad", //地图直接的那个黑线边的颜色
                            // shadowColor: 'red',
                            // shadowBlur: 1,
                            borderWidth: 0,//设置外层边框
                        },
                    },
                    data: this.state.list
                },
                {
                    name: "城市群",
                    type: "effectScatter", //影响散点
                    coordinateSystem: "geo",
                    symbolSize: 5,
                    showEffectOn: "render",
                    rippleEffect: {
                        brushType: "stroke"
                    },
                    // hoverAnimation: true,
                    label: {
                        show: false,
                        normal: {
                            color: "#333333",
                            // formatter: "{b}",
                            formatter: (data) => {
                                var nameShow = data.name.substring(0, data.name.length - 3)
                                return nameShow
                                // console.log(data)
                            },
                            position: "right",
                            show: false //是否显示地名
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: (value) => {
                                var splySales = 0;
                                if (this.state.cityClusterAll && this.state.cityClusterAll.length > 0) {
                                    for (var i = 0; i < this.state.cityClusterAll.length; i++) {
                                        if (this.state.cityClusterAll[i].city_cluster === value.name) {
                                            splySales = this.state.cityClusterAll[i].sales_vs_sply
                                        }
                                    }
                                }
                                if (splySales) {
                                    var { bigSmallShow } = this.state
                                    splySales = splySales.replace(/%/g, '')
                                    if (Number(splySales) >= Number(bigSmallShow)) {
                                        return "#16b6aa"
                                    } else {
                                        return "#eb5652"
                                    }
                                }
                            },
                            shadowBlur: 10,
                            shadowColor: "#333"
                        }
                    },
                    data: convertData3(this.state.cityClusterAll)
                },
                {
                    //线的底座，那个小点
                    name: "city",
                    type: "effectScatter",
                    coordinateSystem: "geo",
                    rippleEffect: {
                        //涟漪特效
                        period: 4, //动画时间，值越小速度越快
                        brushType: "stroke", //波纹绘制方式 stroke, fill
                        scale: 4 //波纹圆环最大限制，值越大波纹越大
                    },
                    symbolSize: 6,
                    // 显示底座上涟漪的文字
                    //   label: {
                    //     normal: {
                    //       show: true,
                    //       position: "right",
                    //       formatter: "{b}"
                    //     }
                    //   },
                    itemStyle: {
                        normal: {
                            //显示底座上涟漪的颜色
                            color: (value) => {
                                var splySales = 0;
                                if (this.state.cityClusterAll && this.state.cityClusterAll.length > 0) {
                                    for (var i = 0; i < this.state.cityClusterAll.length; i++) {
                                        if (this.state.cityClusterAll[i].city_cluster === value.name) {
                                            splySales = this.state.cityClusterAll[i].sales_vs_sply
                                        }
                                    }
                                }
                                if (splySales) {
                                    var { bigSmallShow } = this.state
                                    splySales = splySales.replace(/%/g, '')
                                    if (Number(splySales) >= Number(bigSmallShow)) {
                                        return "#16b6aa"
                                    } else {
                                        return "#eb5652"
                                    }
                                }
                            },
                        }
                    },
                    data: convertData2(this.state.maxMinCity)
                },
                {
                    type: 'lines',
                    // color: '#ff8003',
                    label: {
                        show: true,
                        formatter: (data) => {
                            var nameShowLine = data.name.substring(0, data.name.length - 3)
                            return nameShowLine
                            // console.log(data)
                        },
                        // formatter: "{b}",
                        fontSize: 10,
                        // color:"red",
                        align: 'left',
                    },
                    lineStyle: {
                        type: 'solid',
                        color: (params) => {
                            var splySales = 0;
                            if (this.state.cityClusterAll && this.state.cityClusterAll.length > 0) {
                                for (var i = 0; i < this.state.cityClusterAll.length; i++) {
                                    if (this.state.cityClusterAll[i].city_cluster === params.name) {
                                        splySales = this.state.cityClusterAll[i].sales_vs_sply
                                    }
                                }
                            }
                            if (splySales) {
                                splySales = splySales.replace(/%/g, '')
                                if (Number(splySales) >= 0) {
                                    return "#16b6aa"
                                } else {
                                    return "#eb5652"
                                }
                            }
                        }
                    },
                    data: convertData4(convertData3(this.state.cityClusterAll))
                }
            ]
        };
        myChartMap.setOption(option);
        //设置鼠标移入指定省份颜色不变的效果(去掉判断条件，现在是全部不变色)
        myChartMap.on("mouseover", function (params) {
            // console.log(params)
            // if (params.data.value != undefined) {
            myChartMap.dispatchAction({
                type: "downplay"
            });
            // }
        });
    }
}
