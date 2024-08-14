        


            // 1-点击按钮弹出模态弹窗——————————————————————————
            const showModalBtn = document.getElementById('showModalBtn');
            const modal = document.getElementById('modal');
            const overlay1 = document.getElementById('overlay1');

            showModalBtn.addEventListener('click', function() {
           //  modal.classList.add('show'); // 添加 .show 类
            modal.style.display = 'block';
            overlay1.style.display = 'block';
            });

            overlay1.addEventListener('click', function() {
           //  modal.classList.remove('show'); // 移除 .show 类
            modal.style.display = 'none';
            overlay1.style.display = 'none';
            });


           //2-监听所有导航链接的点击事件——————————————————————————

              document.querySelectorAll('header .nav .right a[href^="#"]').forEach(anchor => {
               anchor.addEventListener('click', function (e) {
                   e.preventDefault();

                   const targetId = this.getAttribute('href');
                   let navHeight = 72; // 默认导航栏高度

                   if (window.innerWidth < 720) {
                        navHeight = 64; // 小于720px时的导航栏高度
                   }

                   if (window.innerWidth < 640) {
                        navHeight = 48; // 小于640px时的导航栏高度
                   }

                   const targetPosition = document.querySelector(targetId).offsetTop - navHeight;

                   window.scrollTo({
                       top: targetPosition,
                       behavior: 'smooth'
                   });
               });
           });


           //3-移动端下拉菜单的响应式布局及交互——————————————————————————
           const menuToggle = document.querySelector('.menu-toggle');
           const mobileMenu = document.querySelector('.mobile-menu');
           const overlay = document.querySelector('.overlay');
           const mobileMenuList = document.querySelectorAll('.mobile-menu-list li');

           menuToggle.addEventListener('click', function () {
               mobileMenu.classList.toggle('open');
               overlay.style.display = mobileMenu.classList.contains('open') ? 'block' : 'none';
           });

           overlay.addEventListener('click', function () {
               mobileMenu.classList.remove('open');
               overlay.style.display = 'none';
           });

           mobileMenuList.forEach(function (menuItem) {
               menuItem.addEventListener('click', function () {
                   mobileMenu.classList.remove('open');
                   overlay.style.display = 'none';
               });
           });

           // 获取相关元素
           const displays = document.querySelectorAll('.display');
           const moreButtons = document.querySelectorAll('.display button');

           // 定义点击按钮的计数器和剩余section数量
           let clickCounts = [0, 0, 0];
           let remainingSections = [0, 0, 0];

           // 设置页面初始化状态
           function setInitialState() {
             for (let i = 0; i < displays.length; i++) {
               const display = displays[i];
               const sections = display.querySelectorAll('section');
               const moreButton = moreButtons[i];
               remainingSections[i] = sections.length;
           
               if (window.innerWidth > 641) {
                 showAllSections(sections);
                 moreButton.style.display = 'none';
               } else {
                 hideExtraSections(sections);
                 moreButton.style.display = 'block';
               
                 if (remainingSections[i] <= 3) {
                   moreButton.style.display = 'none';
                 }
               }
             }
           }

           // 显示全部section
           function showAllSections(sections) {
             for (let i = 0; i < sections.length; i++) {
               sections[i].style.display = 'block';
             }
           }

           // 隐藏多余的section
           function hideExtraSections(sections) {
             for (let i = 3; i < sections.length; i++) {
               sections[i].style.display = 'none';
             }
           }

           // 处理点击事件
           function handleClick(event) {
             const index = Array.from(moreButtons).indexOf(event.target);
             clickCounts[index]++;
             const display = displays[index];
             const sections = display.querySelectorAll('section');
             const moreButton = moreButtons[index];
             const clickCount = clickCounts[index];
           
             const start = clickCount * 3;
             const end = start + 3;
           
             for (let i = start; i < end; i++) {
               if (sections[i]) {
                 sections[i].style.display = 'block';
                 remainingSections[index]--;
               } else {
                 break;
               }
             }
         
             if (remainingSections[index] <= 3) {
               moreButton.style.display = 'none';
             }
           }

           // 添加点击事件监听器
           moreButtons.forEach(button => {
             button.addEventListener('click', handleClick);
           });

           // 添加窗口大小变化事件监听器
           window.addEventListener('resize', setInitialState);

           // 在页面加载完成后设置初始状态
           window.addEventListener('load', setInitialState);


