# Angular

## 基础

### 创建项目

```markdown
ng new name 
		参数： --skip-install  跳过依赖安装
```



<hr>



### 装饰器

```markdown
对值进行元编程
依赖 Object.defineProperty()
基础用法1：
	function decorator(){}
	@decorator
	class A{}
	
	等效于
	class A{}
	decorator(A) || A

angular中装饰器：
	根据装饰器元数据，编译组件，然后生成组件，编译组件过程：
		1. 解析元数据
		2. 处理需要解析的资源
		3. 根据模板、环境和组件需要的元数据，来编译组件
	

```



<hr>



### ng 脚手架生成的项目目录分析

```markdown
node_modules
src
	app				根组件
		app.module.ts 	根模块
		app.component.html/scss/ts 根组件
	assets  		静态文件
	environments	环境文件
	.browserlistrc	浏览器支持
	index.html		入口模板文件
	polyfills		填充文件，angular首先加载的文件
	test.ts			测试的入口文件
	main.ts			入口文件
	style.scss		全局样式

angular.json		angular配置文件
.editorconfig		编辑器的配置文件
karma.conf.js		karma的单元测试配置
package.json		npm配置文件
tsconfig.json		ts编译器的配置
```



<hr>



### 创建组件

```markdown
angular里面的组件可以通过angular cli来进行组件创建 
ng g 可以跳出一系列ng cli操作 
	ng g component components/news  在app/components/news中创建news组件
```



<hr>



### 组件模板

```markdown
1.创建组件数据：
	 在export class 中 public title:string(或者省略public，默认是public)
			在构造函数中，初始化值  this.title = 'title'
2. 常用指令：
	(1) {{title}}	模板语法
	(2) 动态属性  <div [title]='title'> ，加[]即可
	(3) v-for  ->  <li *ngFor="let item of arr;let key = index">  key就是索引;item为元素
	(4) v-if  ->  *ngIf
	(5) ngSwitch -> 
		<span [ngSwitch] ='orderStatus'>
			<p *ngSwitchCase='1'></p>
			<p *ngSwitchDefault></p>
		</span>
	(6) 动态类 [ngClass] ="{'red':true,'orange':flag===1}"  // red为类选择器名
	(7) 动态样式 [ngStyle] = "{'color':'red',fontSize:attr}" // 对象中用驼峰命名法代替
	(8) 模板语法中的管道  {{today | yyyy-MM-dd HH:mm ss}}   today为日期对象
	(9)	事件   (click) = 'function($event)'
	(10) 双向数据绑定
			import {FormsModule} from '@angular/forms'
			@NgModule({imports:[FormsModule]})
			<input [(ngModel)]='var'>  // ()表示事件   []表示绑定属性
	(11) 服务
			(A) 创建服务，将公共方法封装在服务中，组件可以调用服务，服务不能调用组件，服务之间					可以相互调用
						ng g service services/storage
						app.module.ts 中引入服务，在provider中注入
						
			(B) 使用时，引入服务，有两种使用方法：
						1. 实例化服务类，然后使用
						2. 构造器注入语法糖，在构造器中(public storage:StorageService)														{this.storage.get()}即可
	(12) 获取DOM
			如果该dom节点使用了*ng属性，需要在ngAfterViewInit()中才能获取到dom元素；反之，可				以在其他生命周期获取到
			(A) 原生js获取，会缺少一部分功能，比起@ViewChild获取dom元素
			(B) 通过angular提供的 @ViewChild 装饰器来获取dom元素（还可以获取组件），然后再				ngAfterViewInit中使用，步骤：
					1. 引入ViewChild
					2. <div #testViewChild ></div>
					3. @ViewChild('testViewChild') myBox: any;  
					4. myBox就位获取的dom节点
			(C) 获取整个组件的DOM，构造器注入ElementRef
	
	(13) 组件通信
			(A) 父子组件通信：
				应用场景：不同子组件调用父组件时，渲染不同内容
				1. 子组件接受父组件  @input
					a. 父组件中为子组件添加自定义属性
					b. 子组件中@input() 属性名:type
				2. 父组件接受子组件数据 @ViewChild
					a. 通过@ViewChild 获取组件
					b. 直接使用组件
				3. 子组件发送父组件 @output 不建议用
	
	(14) 生命周期
			(0) constructor() 			构造函数
			(A) ngOnChanges(simpleChange:SimpleChange) 			
					时机：组件有输入属性，那么在ngOnInit之前和属性变化时调用，输入属性变化才会调 用
					
			(B) ngOnInit() 				
					时机：首次ngOnChanges之后调用，只调用一次
					用途：请求数据一般放在这里，这里可以使用属性传入的值
			(C) ngDoCheck()				
					时机：每次ngOnChanges之后，首次ngOnInit之后
					用途：augular无法自主检测的变化做出反应
			(D) ngAfterContentInit()
					时机：首次ngDoCheck()之后调用，只调用一次
						  把内容放进组件后调用
					用途：
			(E) ngAfterContentCheckd()
					时机：首次ngAfterContentInit之后调用
						  检查完组件后调用
					用途：
			(F) ngAfterViewInit()		
					时机：首次ngAfterContentCHecked之后调用，只调用一次
						  初始化完视图后
					用途：
			(G) ngAfterViewChecked()
					时机：首次ngAfterViewInit和每一次ngAfterContentChecked之后调用
					      检查完视图
			(H) ngOnDestroy()  只调用一次
					时机：组件销毁
					用途：销毁，防止内存泄露
					
            
           父组件的Content钩子优先子组件的Content
           子组件的View钩子优先父组件
           
           
           DoCheck: Event  XHR  
    
```



<hr>



### 异步编程

```markdown
1. 回调函数: settimeout((cb)=>cb())
2. Promise
3. rxjs,类似promise，但比promise更强大
```

#### rxjs

```markdown
1. 创建observable对象
		const observable = new Observable<any>((observer)=>{
			observer.next('content')  // 类似promise.resolve
			observer.error('error')  //  promse.reject
		})
	
2. 订阅数据  
		observable.subcribe(()=>{}) 
3. 取消订阅，promise是没有这个功能的 
		observable.unSucribe(()=>{})  
4. 发布多次数据，promise不会多次执行resolve
		for (let i in arr) observable.next(i)
5. 工具函数：
	（1）filter,map:
			observable.pipe(filter(()=>{})).subscribe()
```



<hr>





### HTTP请求

```markdown
1. Angular 内置模块
2. Axios 第三方模块
```

#### Angular 内置模块

```markdown
1. app.module.ts 引入 HttpClientModule 在import中
2. 在需要使用的地方 引入 HttpClient 服务
3. this.http.get(api).subscribe()  // 放回rxjs对象
```

#### axios模块

```markdown
1. angular 不支持require引入，需要import 引入
2. 直接使用即可 axios.get()
```



<hr>



### 路由

```markdown
1. 编写router文件
2. 将router文件导入到app的import中
3. 使用路由

基本使用：
	（1）使用：<router-outlet / > 
	
	（2）跳转：
		<a routerLink="/home">  
		<a [routerLink]="['/path']" routerLinkActive='active' /> 跳转加一个active类
		this.route.navigate(['/news']) // 用法与routerlink一致
		(A) 路由传值跳转：
			(a) 引入NavigationExtras(不引入也可以跳转，但引入会更加严格)
			(b) let queryParams:NavigationExtras= { queryParams:{'aid';123}}
			(c) this.router.navigate(['/news'],queryParams)
		
	（3）重定向：
		{path:'**',redirecTo:'home'} // **表示任意路由，注意routes中的顺序
		
	（4）路由传参：
		 (A) <a [routerLink]="['/newsContent']" [queryParams]="{ aid: key }">
		 (B) 在对应组件中导入ActivatedRoute,注入服务
		 (C) this.route.queryparams.subscribe((data)=>console.log(data)) // rxjs对象需要异步订阅，不能直接访问
		 
	（5）动态路由：
		<a [routerLink]="['/path/','id']">  最终拼接为 /path/id的路由
		 this.route.params.subscribe((data)=>console.log(data)) // 动态路由获取值
		
	（6）父子路由：
		{
			path:'home',
			component:HomeComponent,
			children:[
			{
				path:'home-child1',
				component:HomeChildComponent
			}
			]
		}
```





#### 表单基础用法

```markdown
<ul>
    <!-- 姓名 -->
    <li>姓名:<input type="text" [(ngModel)]="formData.username" /></li>
    <!-- 性别 -->
    <li>
      性别:
      <input
        type="radio"
        value="male"
        name="sex"
        id="sexMale"
        [(ngModel)]="formData.sex"
      /><label for="sexMale">男</label>
      <input
        type="radio"
        value="female"
        name="sex"
        id="sexFemale"
        [(ngModel)]="formData.sex"
      /><label for="sexFemale">女</label>
    </li>
    <!-- 地址 -->
    <li>
      地址:
      <select name="city" id="city" [(ngModel)]="formData.city">
        <option [value]="item" *ngFor="let item of formData.citys">
          {{ item }}
        </option>
      </select>
    </li>
    <!-- 爱好 -->
    <li>
      爱好:
      <span *ngFor="let item of formData.hobby; let key = index">
        <input
          type="checkbox"
          [id]="'check' + key"
          [(ngModel)]="item.checked"
        />
        <label [for]="'check' + key">{{ item.title }}</label>
      </span>
    </li>
</ul>
```



<hr>
## 补充

### TS补充

```markdown
1. type assertion:
	(1)const str = (\<string>message).endsWith('')
	(2)const str = (message as string).endsWith('')
	
2. other
	(1)不要为默认的public修饰符，额外添加public关键字，保持整洁
	(2)在构造器上为形参添加修饰符，编译器自动生成一个对应的this.var变量，如果不添加仅仅是形参
	(3)在vscode中，F2选中的变量，即可对变量在当前文件进行重命名
	(4)class中，get x()，set x()，即可直接使用class.x属性，进行get set的使用
```

### 装饰器

```markdown
- @Directive({})  Angular指令的装饰器
		- selector
		- inputs
		- outputs
		- providers
		- exportAs
		- queries
		- host
		- jit
		
- @Component({})  装饰组件类，让angular理解这个类
		- selector:'app-root' // 组件名，<selector> 
		- templateUrl:'' // html
		- template:`<div>...` // templateUrl与template只能出现一个
		- styleUrls:[] // css
		- changeDectection:changeDetectionStrategy.OnPush   检测策略
		- inputs:['bankname','id:_id'] 两个输入属性
        - outputs?:string[] 输出属性
        - providers?:Provide[] 依赖注入，服务 
        - animation:[] 使用动画，<div @fade>
        - 继承Directive 所有属性
            	
- @NgModule({})   装饰模块
		- declarations:[] // 声明对象（组件、指令和管道）
		- imports;[] // 模块导入 
		- provider:[] // 可注入对象（服务）
		- exports:[] // 模块导出
		- bootstrap: 该模块引导时需要进行引导的组件，这里的组件自动添加到entryComponents
		- entryComponents: 对应创建一个ComponentFactory，保存在ComponentFactoryResolver
		- id:模块在getModuleFactory的名字或唯一标识符，如果undefined，不会被注册到factory中
		
- @Injectable()   标记一个类是否由Injector进行创建
		- providedIn:  为指定的模块提供注入
		
- @Input()	标记为输入属性，并提供配置元数据，该输入属性会绑定到模板的某个DOM属性中，变更检测时，Angular会自动使用这个DOM属性值来更新
		- bindingPropertyName?:string 输入属性绑定到的DOM属性的名字
		不指定的话，将使用一个原始名字
		- 例子： @Input() account-id:sring;  @Input('account-id') id:string; 这两个等效
		
- @Output() 标记为输出属性，变更期间自动更新
		- bindingPropertyName?:string  

- @Optional()	用于构造函数形参的装饰器，将参数标记为可选依赖，如果找不到，就提供null
- @SkipSlef()	用于构造函数形参的装饰器，从父注入器开始依赖解析，不会检查本地注入的提供者，也就是避免本地注入的循环引用，与optional配合使用，可以使得模块变成单例模式，也就是只能在父模块中实例化，不能再被其他实例化，其他地方实例化，只会抛出错误

- @ViewChild()	变更检测器会在视图的DOM中查找能匹配这个选择器的第一个元素，DOM更新，该属性也会更新
- @ViewChildren() 获取全部元素

- @Pipe() 标记为管道，并提供配置元数据，需要实现一个transform(value,model)方法
		- name 管道名，驼峰命名
		- pure	默认为true，为纯管道，也就是transform()只有在输入属性变化才会调用
		- 使用：{{message | pipeName:'auth'}}
```

###  性能优化

```markdown
1. Minification 删除所有注释和空白
2. Uglification	将函数、变量名重命名为简短的名字
3. Bunding	多个js文件打包成一个js文件，只需要进行一次http请求即可
4. Dead code elimination	没有依赖的代码剔除
5. Ahead of Time (AOT) compiling	提前编译
```





### 常见错误



```markdown
1. 两种服务实现：
	1. 组件级注入服务
		@component({provider:[]})
		非单例模式，不同组件不同的实例
		顺延找注入，先找组件注入，再找根组件注入
	2. 模块级注入服务
		@NgCompoent({provider:[]})
		单例模式，不同组件为同一个实例

最好是在创建服务处生命作用域，这样可以更好的treeShaking：
	@Injectable({
		providedIn:'root' //专门为根模块服务
	})
	
2. 公共组件实现：
	问题：直接在不同的组件中导入，并声明，报错
	解决方案：将公共组件封装成一个module，然后到处module，在不同组件中import进去，而不是声明组件
	
3. 
```



### angular.json 配置

![image-20220621141325817](Angular.assets/image-20220621141325817-16557920140383.png)

```markdown
- $schema: 用于验证JSON数据格式
- version:该配置文件的版本（而非项目版本）
- newProjectRoot:创建新工程的位置，当时候 ng g application/library时，放到该目录下
- defaultProject:默认值为 ng new projectName的name，在工作区有多个项目时，该属性就体现出价值了，ng serve 或 ng build 时不需要指定项目名称,否则 ng serve --project=projA
- projects:工作区的每个项目的配置项,{key:value}key为项目名称，value为具体配置
```

#### Projects

![image-20220621141816521](Angular.assets/image-20220621141816521.png)

```markdown
projects内部的配置：
- projectType: application | library ,application可以在浏览器中独立运行，library不行
- schematics:定制ng generate 的默认选项
	如上图中，表示ng g c时，默认创建scss的文件
- root: 项目跟文件，默认值为空，工作区最顶层
- sourceRoot: 项目源文件的根文件夹
- prefix: 组件或指令的前缀， app-home
- architect: 项目构建器的配置
```

#### architect

![image-20220621142009801](Angular.assets/image-20220621142009801.png)

```markdown
- build: ng build 的默认值
- serve: ng serve 覆盖构建默认值，并添加额外默认值
- extract-i18n: ng xi18n 的默认值，国际化，翻译
- test: ng test
- e2e: ng e2e 
- lint: ng lint
- server: ng run \<project>:server 服务端渲染
- app-shell: ng run \<project>:app-shell 渐进式PWA应用  \ 不存在
```



#### 构建内部配置

![image-20220621142733580](Angular.assets/image-20220621142733580.png)

```markdown
每一个构建起都有这些属性:

- builder:构建工具的npm包，ng build默认为@angular-devkit/build-angular:browser

- options: builder所需要的配置项，不同包有不同配置项
	- outputPath: 打包后输出文件路径
	- index: 主要的模板文件
	- main:  入口文件
	- polyfills: polyfill文件
	- tsConfig: ts配置文件
	- inlineStyoleLanguage: 内联样式语言
	- assets: ['url1','url2']  静态资源路径
		也可以使用对象：
			assets:[{glob:'',input:'',output:'',ignore:[]}]
	- styles: ['',{}] 引入的css路径
	- scripts: ['',{}] 引入js的路径
	
- broserTarget:"projectName:build:development" 可以将build构建工具中的development配置拿过来直接使用，不需要再配置
	该配置项，不仅可以在options中使用，还可以在configurations的环境中使用
		
	
- configurations:不同环境的配置
	- production: 生产环境配置
	- dev : 开发环境，自定义名字
		- budgets:预算
			- type: bundle 特定包大小 | initial 应用初始大小 | allScript 所有脚本大小| all 整个应用大小 | anyComponentStyle 任何一个组件样式文件的大小 | anyScript 任何一个脚本的大小 | any 任何一个文件的大小
			- name: 包的名字（type=bundle时）
			- maximumWarning 超过这个值，给出警告
			- minimumWarning 小于给警告
			- warning	大于或小于都警告
			- maximumErro 	超过这个值，报错
		- outputHashing: 'all' 打包文件加上hash值
		- buildOptimizer:true 优化编译器
		- optimization:false 优化
		- vendorChunk:true 	是否分离迪桑发插件
		- extractLicenses：false 管理第三方插件的许可
		- sourceMap：true 生成sourceMap文件，会使打包变慢，但是编译后的代码有路径可查
		- namedChunks：true 使用chunkeName来替换chunkId，保持缓存能力
	- defaultConfigurations:"dev" // 指定默认环境
		
```



<hr>




## 项目

### 设计原则

```markdown
1. YAGNI:  You Arenot Gonna Need It  不写不需要的代码，先完成，再完美
2. DRY： Dont Repeat Yourself		不要重复代码，重复的代码剥离出来
3. OCP： Open Close Principle		开闭原则，对扩展开放，对修改封闭
4. Low Coupling， High Cohesion		高聚合，低耦合；本类互相关联，不同类很少关联
5. Dimeter Law						 迪米特法则，最少知识法则；一个对象、组件只负责少量功能
```



### 音乐播放器

```markdown
前端 angular
后端 github的网易云音乐api

项目重点：angular的学习，忽略css，布局和样式采用了codepen的一个示例
```



#### 项目初始化

```markdown
1.  模块化
		(1) core模块，作为核心模块，控制所有其他模块和服务
				(A) ng g m core
				(B) 注意导出share模块，因为组件库存放在share模块中
				(C) 构造函数中使用 @SkipSelf() @Optional()装饰器，避免循环调用和依赖为空
		(2) share模块，存放公共组件
				存储了组件库
		(3) pages模块，管理页面
				导入了share模块
		(4) services模块，管理服务
		
2. 新建组件
		(1) 在pages目录下新建路由和模块配置文件  |  管理组件的模块配置和路由
		(2) 然后在对应目录新建组件，html scss, ts三个文件	| 编写组件
		(3) 在路由中配置组件的内部路由 	
		(4) app根模块中配置总路由  | app.component.html 中 router-outlet 显示
```

##### 常见的 NgModule模块

| 模块                | 位置                      | 功能                           |
| ------------------- | ------------------------- | ------------------------------ |
| BrowserModule       | @angular/platform-browser | 启动和运行浏览器应用的基本服务 |
| CommonModule        | @angular/common           | NgIf, NgFor之类的内置指令      |
| FormsModule         | @angular/forms            | 使用 NgModel                   |
| ReactiveFormsModule | @angular/forms            | 构建响应式表单                 |
| RouterModule        | @angular/router           | 前端路由                       |
| HttpClientModule    | @angular/common/http      | http请求                       |





#### app根组件说明

##### html

```markdown
1. 背景：使用了背景图片+ 方式，如果视频找不到或不支持，将显示背景图片
		主题切换时，加上一层滤镜，更加契合主题
2. 主题切换按钮：修改container的类名，使其具有主题的变量，改变颜色变量即可完成主题切换

3. 在主要内容层级添加了一个遮罩，当遮罩元素具有类名is-active时显示遮罩
```



##### scss

```markdown
1. 将变量、主题和全局属性剥离到style.scss中
2. 使用部分的媒体查询，进行display：none
3. 搜索框聚焦时，添加wide类，修改整个header样式，加宽搜索框
4. .side-wrapper + .side-wrapper{}的用法，使得第一个类没有里面的样式，其余的都有
5. 左上角的模仿苹果标志，第一个圆由背景颜色+border-radius构成，其余两个圆由box-shadow，改变x轴偏移量和颜色构成
```



##### ts



<hr>



#### DeBug

##### svg的viewBox问题

```markdown
svg中需要viewBox来进行合理的渲染区域选定，其中viewBox的 B是大写的，不知为何，原生的html中可以使用小写b，但在angular里面不能使用小写的b，必须使用大写的
```



##### 路由复用问题

```markdown
目的：为实现前进后退时，之前的路由组件保持原样，所以使用了路由复用的策略
思路：通过保存路由快照，路由切换时渲染
方法：
	 路由复用策略：
    angular提供了几种方法：
      - shouldDetach 是否允许路由复用
      - store 当路由离开时触发，存储路由
      - shouldAttach 是否允许还原路由
      - retrieve 获取存储路由
      - shouldReuseRoute 进入路由触发，是否同一路由时进行路由复用
    策略描述：
      1. 把路由/list 设置为允许复用(shouldDetach)
      2. 路由快照保存在store中
      3. 当shouldReuseRoute成立时，即再次遇到/list路由时，先判断shouldAttach是否允许还原路由
      4. 最后从retrieve中拿到路由快照并构建组件
 
 注入：
 	providers: [
    // TODO: provide和useCLass注入的问题
    {
      provide: RouteReuseStrategy,
      useClass: RouteReuseService,
    },
  ],
```



##### 无法绑定ngClass的问题

```markdown
在share中导入了commonModule作为ngCLass的类，删除之后，没法使用，所以一定需要该模块
```



##### NG 6002 6003 的问题

```markdown
先前出了问题，然后缓存了，需要手动重新到出错文件处更新一下，即保存一下
```



##### 用户样式代理的影响

```markdown
当作者样式表不存在时，将会使用用户样式表
	在本项目中，忘记将DevUI的样式表引入到项目中，所以导致了用户样式表影响carousel的问题
```







<Hr>





## 官方文档

### 理解Angular

```markdown
1. 组件
2. 模板
3. 指令
4. 依赖注入
```

#### 组件

```markdown
- 创建组件方式：
		（1）Angular CLI: ng generate component <component-name>
				其中 <name>.component.spec.ts是测试文件
		（2）手动创建组件:
		
- 视图封装
		from @angular/core
		@Component({encpsulation:ViewEncapsulation.ShadowDom})
		（1）ShadowDom模式，原生的Shadow DOM实现，组件样式不进不出，全局样式进不来
				值得注意的是：有封装为None的组件，样式会泄露出来，ShadowDom同时受到影响，即使是子组件None也会影响父组件Shadow
		（2）Emulated模式，Angualr默认的封装模式，模拟Shadow DOM行为，组件样式只进不出，全局样式能进来，组件样式出不去
		（3）None模式，不用视图封装，直接把CSS添加到全局样式中，组件样式能进能出
		
- 组件通信
		（1）@Input()  父组件([属性]='var'-> 子组件(@input('属性') e='')
				只写@input() 默认名为传进的变量名
				使用OnChanges()来监视@Input()变化
		（2）TS支持getter setter来对当前属性进行监听，即get var():string{} set var(){}
		（3）ngOnChanges()来监听多个输入属性变化，每一次输入属性变化都会调用这个钩子
		（4）@output()  子组件->父组件，自定义事件
				@Output() voted = new EventEmitter<>() 事件发射器
				voted.emit(var)触发父组件的(voted)='事件'
		（5）@ViewChild()获取子组件
		（6）通过服务来通信
		
- 组件样式伪类
		（1）:host,选择宿主元素
				:host(.active){}  选取了拥有所有active类的宿主元素 
				:host(.active) h2{} 选取了所有拥有active类的宿主元素的h2子元素
		（2）:host-context, 通过祖先元素是否具有这个类，来选取元素

- 内容投影
		（1）单插槽的：组件可以从单一来源接受内容
				（A）创建一个组件
				（B）添加<ng-content>元素，占位符，不会创建真正的DOM元素所以自定义属性被忽略
				（C）组件传入的DOM在ng-content处渲染
				
		（2）多插槽的：组件可以从多个来源接受内容
				（A）创建一个组件
				（B）添加<ng-content>元素
				（C）<ng-content select="[componentA]">
				（D）组件传入内部，<p componentA>123</p>
				没有select属性的ng-content将会接受所有剩下的组件（没能匹配的组件）
			
		（3）有条件的：仅在满足特定条件时才渲染
				（A）创建一个组件
				（B）<ng-template appTemplateTest>
						使用ng-template之前，angular不会初始化内容
				（C）<ng-container [ngTemplateOutlet]='content.templateRef'>
						a. ngTemplateOutlet是内置指令，可以用于任何类型元素（作为内嵌式图）
						b. 通过@ContentChild获取了模板内容的引用(content.templateRef:TemplateRef)，即addTEmplateTest，并通过ngTemplateOutlet指令渲染引用的内容，具体看文档https://angular.cn/guide/content-projection	
						c. 如果是多插槽，@ContentChildren来获取QueryList
						不建议使用ng-content元素，因为该元素的内容一定会被初始化，即使未定义
			
- 动态组件
	动态组件常用于显示广告，即运行期间加载一些新组件，用ComponentFactoryResolver来添加组件
		（1）指令：
			通过ViewContainerRef来获取对容器视图的访问权，在这里即为宿主
		暂时空

```





<hr>



#### 模板

```markdown
- 文本插值
	（A）模板表达式
		（1）{{param}}
		（2）<img src='{{param}}'>
		（3）可以在@Component中配置interpolation来配置插值分隔符
	（B）表达式上下文
		（1）模板输入变量： *ngFor='let cus of cuss' {{cus.name}}
		（2）模板引用变量：<input #cus>{{cus.value}}</input>
	（C）模板变量规则：
		（1）模板变量
		（2）指令上下文中
		（3）组件成员中

- 管道
	管道常用来对字符串、数值、日期和其他显示数据进行转化和格式化。
	（A）常用的内置管道：
		（1）DatePipe:根据本地环境规则格式化日期
		（2）UpperCasePipe/LowerCasePipe：转为大写/小写
		（3）CurrencyPipe：数字转为货币字符串，根据本地环境规则格式化
		（4）DecimalPipe：数字转为小数的字符串，根据本地环境格式化
		（5）PercentPipe：数字转为百分比字符串，根据本地环境
	（B）参数和管道链：
		（1）{{amount | currency:"EUR"}} :后面为管道函数的参数
		（2）串联管道，管道链 {{amount |currency:'EUR' | upperCase}}
	（C）PipeTransform接口，自定义管道：
		（1）@Pipe({name:'name'})
        	export class pipeName implements PipeTransform{
				在里面定义transform函数即可
			}
	
- 属性绑定
	（A） Property 和 Attribute 的区别：
		（1） Property 是DOM的属性，即JS对象
			Property 会同步attribute的值，反之不行，建议使用property而不是attribute
		（2） Attribute是HTML特性，只能是字符串
	（B）注意
		（1） angular不允许<script>标记的html
		
- 双向绑定
	属性绑定和时间绑定的组合简写形式
		<input [(size)]='fontSizePx'>  
		等效为:
			<input [size]='fontSizePx' (sizeChange)='fontSizePx=$event' >
	但由于原生HTML中没有这样的命名模式，所以双向绑定需要NgModel来作为桥梁,即[(NgModel)]=''
	
```





####  指令

```markdown
分为了三种类型：
	1. 组件		带有模板的指令
	2. 属性型指令  更改元素、组件外观或行为
	3. 结构型指令  DOM操作
```



##### 内置指令

```markdown
- 内置属性型指令：
	1. NgClass  更改一组CSS类，单个类使用class即可
	2. NgStyle  更改HTML样式
	3. NgModel  双向绑定
	
- 内置结构型指令：
	1. NgIf
	2. NgFor
	3. NgSwitch
```



##### 用户属性型指令

```markdown
- 建立属性型指令和基本使用
	1. ng g directive highlight
		创建src/app/hightlight.directive.ts即测试文件，并在AppModule声明指令类
	2. <p appHighlight></p>  appHightlight为 指令类文件的selector:[appHightlight]

- 向指令类传值
	1. 建立指令类
		@Input() appHighlight= ''
	2. <p [appHighlight]='color'> color 即为 appHightlight
	3. <P [appHighlight]='color' defaultColor='violet'> 在指令类中this.defaultColor使用
	
```



##### 用户结构型指令

```markdown
- 建立结构型指令和基本使用
	1. ng g d highlight
	2. ...

- 与用户型指令区别：
	*语法是简写形式：
		原：<div *ngIf='condition'>
		转化：
			ng-template不会渲染在dom中，但可以在angular操作该元素通过templateref获取
			<ng-template [ngIf]='condition'>
				<div>
			
```



<hr>





#### 注入

```markdown
DI（依赖项注入）是一种设计模式
- 创建可注入服务
	1. ng g service services/hero
		@Injectable({providedIn:'root'}) root 表示在整个应用程序都是可见的

- 依赖提供者：
	1. useClass替代性的类提供者  
    	providers:[Logger]  -> [{provide:Logger, useClass:Logger}]
	2. useExisting 为类接口提供别名：
		[NewLogger,{provide:OldLogger, useExisting:NewLogger}]
		无论注入的是OldLogger 还是 NewLogger 都是使用NewLogger作为注入，并且只有一个示例
	3. useValue 注入一个对象
		
```









<hr>



## 微前端

###  简易的微前端架构-非angular的原生网页下使用angularElement   不可用！define

```markdown
- （A）初始化angular项目
	（1）ng new --create-application=false mfdemo1 && cd mfdemo1
		可以在同一个workspace中创建不同的project
	（2）ng g application mfdmoe1 --routing --style=css
	（3）ng g application mf-element1 --routing=false --style=css
	（4）ng add @angular/elements --project=mf-element1  将创建的element加入的angular内建elments
	（5）ng add ngx-build-plus --project=mf-element1
		
- （B）搭建简易微前端angular项目
	（1）移除app组件的selector属性，不需要
	（2）移除AppModule的bootstrap属性，不需要
	（3）创建个性化element
		a. import {Injector} from '@angular/core'
		b. import {createCustomElement} from '@angular/elements'
		c. constructor(private injector:Injector)
		d. ngDoBootstrap()中加入下面两行代码：
			const cusElement = 
					createCustomElement(AppComponent,{injector:this.injector})
			cusElement.define('mf-element-name',cusElement)
	（4）ng build --project=mf-element1 --prod --output-hashing=none --single-bundle		微前端应用
	（5）ng build --project=mf-element1 --prod --output-hashing=none 主应用
	（6）在主应用中引入微前端应用，然后直接通过名字使用
```



### 简易的微前端架构-angular中使用angularElement

```markdown
- （A）初始化项目
	（1）npm i @angular-extensions/elements
	（2）import {LazyElementsMOdule} from '@angular-extensions/elements'
			引入AppModule的imports中
	（3）shemas:[CUSTOM_ELEMENTS_SCHEMA]
			引入AppModule的schemas中
	（4）使用：
			通过该属性，进行应用加载
			在app组件中载入其他应用<mf-element1 *axLazyElement="'/mf-element1.js'"></mf-element1>

```





### single-spa

```markdown
```







