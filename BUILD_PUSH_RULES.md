# 构建与推送规则

## 开发分支

日常源码、配置和文档提交到 `main`。不要提交 `node_modules`、临时日志或本地环境变量。

## 构建

在项目根目录执行：

```bash
npm install
npm run build
```

Vite 默认将生产构建输出到 `dist/`。`dist/` 是临时构建目录，不进入 Git。

## build-develop

需要把构建结果推送到同一仓库的 `build-develop` 目录时，执行：

```bash
rm -rf build-develop
cp -R dist build-develop
git add build-develop
git commit -m "build: update build-develop"
git push origin main
```

`build-develop` 是仓库中的可部署构建快照，源码仍然以 `src/` 和根目录配置为准。

## 标准发布顺序

1. 修改源码并本地运行 `npm run build`。
2. 确认 `dist/` 构建成功。
3. 将 `dist/` 复制为 `build-develop/`。
4. 检查 `git diff --stat` 和 `git status`。
5. 提交源码与构建快照。
6. 推送到远程 `main`。