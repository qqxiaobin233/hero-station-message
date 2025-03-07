// 富文本编辑器
// 创建编辑器函数，创建工具栏函数

// 生产模式，commonjs导入
// const wangEditor = require('@wangeditor/editor')
// const { createEditor, createToolbar } = window.wangEditor

// 开发模式，浏览器挂载，es6模块导入
// 开发模式，浏览器挂载，es6模块导入
import { createEditor, createToolbar } from '@wangeditor/editor';

function editor() {
    // 编辑器配置对象
    const editorConfig = {
        // 占位提示文字
        placeholder: '请于此添加内容...',
        // 编辑器变化时回调函数
        onChange(editor) {
            // 获取当前编辑器对应的文本域
            let textarea;
            if (editor.selector === '#editor-container-1') {
                textarea = document.querySelector('textarea[name="content-1"]');
            } else if (editor.selector === '#editor-container-2') {
                textarea = document.querySelector('textarea[name="content-2"]');
            }
            // 获取富文本内容
            const html = editor.getHtml();
            // 将内容同步到对应的文本域
            if (textarea) {
                textarea.value = html;
            }
        },
        MENU_CONF: {
          pasteText: {
              // 选择过滤掉换行符和多余的段落格式，将内容变成一行
              filter: (text) => text.replace(/\r\n|\r|\n/g, '').replace(/<p.*?>/g, '').replace('</p>', '')
          }
      },
    };

    // 创建编辑器
    const editor1 = createEditor({
        // 创建位置
        selector: '#editor-container-1',
        // 默认内容
        html: '<p><br></p>',
        // 配置项
        config: editorConfig,
        // 配置集成模式（default 全部）（simple 简洁）
        mode: 'simple', // or 'simple'
    });

    const editor2 = createEditor({
        // 创建位置
        selector: '#editor-container-2',
        // 默认内容
        html: '<p><br></p>',
        // 配置项
        config: editorConfig,
        // 配置集成模式（default 全部）（simple 简洁）
        mode: 'simple', // or 'simple'
    });

    // 工具栏配置对象
    const toolbarConfig = {};

    // 创建工具栏
    const toolbar1 = createToolbar({
        // 为指定编辑器创建工具栏
        editor: editor1,
        // 工具栏创建的位置
        selector: '#toolbar-container-1',
        // 工具栏配置对象
        config: toolbarConfig,
        // 配置集成模式
        mode: 'simple', // or 'simple'
    });

    const toolbar2 = createToolbar({
        // 为指定编辑器创建工具栏
        editor: editor2,
        // 工具栏创建的位置
        selector: '#toolbar-container-2',
        // 工具栏配置对象
        config: toolbarConfig,
        // 配置集成模式
        mode: 'simple', // or 'simple'
    });
}

editor();

export default editor;