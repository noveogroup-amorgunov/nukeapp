---
status: ready-for-human
---

# Мелкие правки app/cart/shared (батч на ветку `refactor/app-cart-cleanup`)

Reporter: @amorgunov (maintainer), 2026-09-16. Реализовано в коммите 58e1223.

## Пункт 4 — итог расследования

Репро на headless Chrome/WebKit (390×844, touch, fling) НЕ воспроизводится —
баг живёт только на реальном iOS Safari. Диагноз: @tanstack/react-virtual
3.14.11 (virtual-core 3.17.9, 2026-09-07) не содержал фикс 3.17.11 от
2026-09-14: debounced scroll-end fallback (iOS не поддерживает `scrollend`)
перезаписывал measurement adjustments stale scroll offset'ом — ровно симптом
«отступы схлопываются после скролла и восстанавливаются после касания».
Fix: upgrade до react-virtual 3.14.13 (virtual-core 3.17.11).

**Требуется проверка мейнтейнером на реальном iPhone** (iOS Safari, дебаг-рамки
включены, ~20 позиций в корзине, скролл вниз/вверх).

## Пункты

1. **[enhancement]** `src/app/with-providers/router/` → `src/app/providers/router/`.
   Verified: директорию импортирует только `src/app/appEntry.tsx:11`; после
   переноса `with-providers/` пустая — удалить целиком.
2. **[bug]** Дебаг-рамка fsd-атрибута перекрывает открытый DropdownMenu.
   Verified: root cause — `.fsd-debug-mode [data-fsd]::after` имеет
   `z-index: 11` (base.css:99), а дропдаун порталится в body с `z-index: 10`
   (DropdownMenu.module.css:7). `[data-fsd]` — `position: relative` без
   `z-index`, т.е. не создаёт stacking context, и label убегает в глобальный
   контекст поверх дропдауна. Fix: `z-index: 0` у `.fsd-debug-mode [data-fsd]`
   в base.css — контекст локализуется, дропдаун снова сверху. Изменение
   z-index-а, как и просили.
3. **[enhancement]** Неавторизованный: клик по иконке профиля → сразу
   `/login`, без DropdownMenu. Verified: сейчас LayoutUserProfile рендерит
   дропдаун с пунктом Login (LayoutUserProfile.tsx:27-37). Fix: для
   неавторизованного рендерить голый IconButton с navigate('/login').
4. **[bug]** Cart list на мобилке: отступы между карточками схлапываются
   после скролла. → Вынесено в отдельный item
   `.scratch/cart-mobile-gap-collapse/` (upgrade react-virtual 3.14.13
   проблему на реальном iOS не решил; расследование продолжено там).
5. **[enhancement]** `src/shared/redux/` → `src/shared/lib/redux/`.
   Verified: 34 файла с `from '@/shared/redux'` + 7 module augmentation
   `@/shared/redux/model/types`; относительных импортов и упоминаний в
   конфигах нет. Alias `@/*` покрывает новый путь.
6. **[bug]** В дебаг-режиме иконка удаления в карточке корзины круглая
   (соседняя — избранное — квадратная). Verified: `data-fsd` висит на
   IconButton, outline следует за `border-radius: 100px` корня IconButton
   (IconButton.module.css:13); у AddToWishlistIcon атрибут на обёртке-div —
   потому квадратная. Fix: навесить `data-fsd` на обёртку-div, как у соседа.

## Open questions (item 4)

- Переехало в `.scratch/cart-mobile-gap-collapse/`.
