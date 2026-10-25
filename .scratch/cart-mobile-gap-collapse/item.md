---
status: ready-for-human
---

# Cart: схлопывание отступов списка товаров на мобилке после скролла

Reporter: @amorgunov (maintainer), 2026-09-16. Отложено после безуспешной
первой попытки фикса (PR #69). Заблокировано на доступе к реальному
iOS-устройству для отладки.

## Symptom

На реальном iPhone (iOS Safari), FSD дебаг-рамки включены: в списке товаров
корзины отступы между карточками (gap 12px) схлопываются — карточки
вплотную/перекрываются. Возникает сразу при скролле вниз, остаётся после
остановки, восстанавливается после следующего касания страницы.

## Component

`src/shared/ui/CartProductList/CartProductList.tsx` — `useWindowVirtualizer`
(@tanstack/react-virtual), dynamic measurement (`measureElement` по
`data-index` на `.row`), `gap: 12`, `estimateSize: () => 160`, overscan 5,
`scrollMargin: listRef.current?.offsetTop ?? 0`. Строки — absolute + translateY.

## Что уже проверено (2026-09-16, в рамках PR #69)

- **Не воспроизводится** в headless Chrome и WebKit (Playwright, 390×844,
  isMobile/hasTouch, DPR 3): логин → корзина с 23 позициями (seed через
  PATCH /cart в page context) → fling/smooth скролл вниз и вверх → замер
  прямоугольников `[data-index]` — перекрытий и gap < 10px нет.
- Реальная высота карточки на 390px вьюпорте: **181px**, estimate 160 —
  mismatch есть, но небольшой.
- Апгрейд @tanstack/react-virtual 3.14.11 → 3.14.13 (virtual-core 3.17.11,
  фикс debounced scroll-end fallback от 2026-09-14) — **проблему не решил**
  (проверено на реальном устройстве 2026-09-16).
- Виртуализатор сам не ломается в эмуляции: measurement через RO работает и
  во время скролла (`shouldMeasureDuringScroll` → true).

## Открытые гипотезы (на следующий заход)

1. **estimateSize меньше реальной высоты** (160 < 181, docs рекомендуют
   оценивать «largest possible size»). На iOS Safari RO-колбэки при
   momentum-скролле троттлятся/откладываются (WebKit #269911) → смонтированные
   при скролле строки держат estimate → следующие строки наезжают. Фикс:
   поднять estimate (≈ 200–220 на мобиле; на десктопе карточки выше ~300 из-за
   media aspect-ratio 1 — нужен breakpoint-зависимый estimate).
2. Подключить **реальный iPhone к отладке**: Safari remote inspector
   (vite dev через LAN) — посмотреть, какие размеры virtualizer держит в кэше
   во время/после скролла (`virtualizer.measurementsCache`).
3. Проверить `--s-viewport`-специфику Page layout (колонки стекаются,
   `scrollMargin` по offsetTop) на реальном девайсе.

## Связанное

- PR #69 (upgrate react-virtual оставлен — патч-релизы всё равно полезны).
- Виртуалайзер поднят по ченджлогу: iOS-специфика momentum скролла
  (запись scrollTop во время momentum отменяет его) покрыта с virtual-core
  3.15.0; «scroll-up jank with dynamic items» закрыт.
