// vite.config.ts
import { writeFile as writeFile2 } from "node:fs/promises";
import { resolve as resolve2 } from "path";
import { defineConfig } from "file:///Users/justinkimbrell/Code/flipclock/node_modules/.pnpm/vite@4.5.0_@types+node@20.8.9_sass@1.69.5/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/justinkimbrell/Code/flipclock/node_modules/.pnpm/vite-plugin-dts@3.6.2_@types+node@20.8.9_typescript@5.2.2_vite@4.5.0/node_modules/vite-plugin-dts/dist/index.mjs";

// .bin/extractTypes.ts
import { existsSync } from "node:fs";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "path";
import { Project } from "file:///Users/justinkimbrell/Code/flipclock/node_modules/.pnpm/ts-morph@20.0.0/node_modules/ts-morph/dist/ts-morph.js";
var sourceFile = new Project({
  tsConfigFilePath: "./tsconfig.json"
}).addSourceFileAtPath("./dist/index.d.ts");
var baseDir = resolve("./docs/types");
var extensions = {
  "PropertyDeclaration": ".prop.ts",
  "PropertySignature": ".prop.ts",
  "ClassDeclaration": ".class.ts",
  "MemberDeclaration": ".member.ts",
  "MethodDeclaration": ".method.ts",
  "FunctionDeclaration": ".function.ts",
  "TypeAliasDeclaration": ".type.ts",
  "InterfaceDeclaration": ".interface.ts",
  "VariableDeclaration": ".var.ts"
};
var COMMENT_REGEX = /(export(\s+)?)?(declare(\s+?))?/;
var EXPORT_REGEX = /export?(\s+)?(declare)(\s+)?/;
function groupBy(array, key) {
  return array.reduce((hash, obj) => {
    if (obj[key] === void 0)
      return hash;
    return Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) });
  }, {});
}
async function extractTypes() {
  if (existsSync(baseDir)) {
    await rm(baseDir, {
      recursive: true,
      force: true
    });
  }
  await mkdir(baseDir);
  for (const [key, decorations] of sourceFile.getExportedDeclarations()) {
    const declarations = {};
    for (const decoration of decorations) {
      const kindName = decoration.getKindName();
      if (kindName === "VariableDeclaration") {
        continue;
      }
      if (!declarations[kindName]) {
        declarations[kindName] = [];
      }
      if ("getProperties" in decoration) {
        for (const prop of decoration.getProperties()) {
          if (!declarations[prop.getKindName()]) {
            declarations[prop.getKindName()] = [];
          }
          declarations[prop.getKindName()].push({
            filename: `${key}.${prop.getName()}`,
            contents: prop.getText().replace(COMMENT_REGEX, "")
          });
        }
      }
      if ("getMethods" in decoration) {
        for (const prop of decoration.getMethods()) {
          if (!declarations[prop.getKindName()]) {
            declarations[prop.getKindName()] = [];
          }
          declarations[prop.getKindName()].push({
            filename: `${key}.${prop.getName()}`,
            contents: prop.getText().replace(COMMENT_REGEX, "")
          });
        }
      }
      declarations[kindName].push({
        filename: key,
        contents: decoration.getText().replace(COMMENT_REGEX, "").replace(EXPORT_REGEX, "").trim()
      });
    }
    for (const [kindName, files] of Object.entries(declarations)) {
      const groups = groupBy(files, "filename");
      for (const [key2, value] of Object.entries(groups)) {
        const contents = value.map(({ contents: contents2 }) => contents2).join("\n");
        const path = resolve(baseDir, `${key2}${extensions[kindName] ?? ".ts"}`);
        await writeFile(path, contents);
      }
    }
  }
}

// src/helpers/signal.ts
var currentListener = void 0;
function createSignal(initialValue) {
  let value = initialValue;
  const subscribers = [];
  function read() {
    if (currentListener) {
      subscribers.push(currentListener);
    }
    return value;
  }
  ;
  function write(newValue) {
    value = newValue;
    subscribers.forEach((fn) => fn());
  }
  ;
  function reset() {
    value = initialValue;
    subscribers.splice(0, subscribers.length);
    return value;
  }
  ;
  return [read, write, reset];
}
function watchEffect(callback) {
  currentListener = callback;
  callback();
  currentListener = void 0;
}

// src/helpers/ref.ts
function ref(value) {
  const [getValue, setValue] = createSignal(value);
  return new Proxy({ value }, {
    get() {
      return getValue();
    },
    set(target, _, value2) {
      target.value = value2;
      setValue(value2);
      return true;
    }
  });
}
function computed(fn) {
  return typeof fn === "function" ? {
    get value() {
      return fn();
    }
  } : {
    get value() {
      return fn.get();
    },
    set value(value) {
      fn.set(value);
    }
  };
}

// src/helpers/css.ts
function sheet() {
  const existing = document.querySelector("style#__flipclock__");
  if (existing && existing instanceof HTMLStyleElement) {
    return existing;
  }
  const el = document.createElement("style");
  el.id = "__flipclock__";
  document.head.appendChild(el);
  return el;
}
var cachedStringifiedCss = {};
var cachedHashedCss = {};
function mergeCss(source, target) {
  for (const key in target) {
    if (typeof source[key] === "object" && typeof target[key] === "object") {
      source[key] = mergeCss(
        source[key],
        target[key]
      );
    } else {
      source[key] = target[key];
    }
  }
  return source;
}
function useCss(source) {
  const css2 = ref(source);
  const hash = computed(() => {
    const stringified = stringify(css2.value);
    if (cachedStringifiedCss[stringified]) {
      return cachedStringifiedCss[stringified];
    }
    const hash2 = toHash(stringified);
    cachedStringifiedCss[stringified] = hash2;
    return hash2;
  });
  watchEffect(() => {
    if (typeof document === "object") {
      if (!cachedHashedCss[hash.value]) {
        cachedHashedCss[hash.value] = jsToCss(css2.value, `.${hash.value}`);
      }
      sheet().innerHTML = Object.values(cachedHashedCss).join("");
    }
  });
  const context = {
    css: css2,
    hash,
    merge(target) {
      css2.value = mergeCss(css2.value, target);
      return context;
    },
    extend(target) {
      return useCss(mergeCss(css2.value, target));
    },
    toString() {
      return cachedHashedCss[hash.value];
    }
  };
  return context;
}
function jsToCss(obj, selector) {
  let outer = "";
  let blocks = "";
  let current = "";
  for (let key in obj) {
    let val = obj[key];
    if (key[0] == "@") {
      if (key[1] == "i") {
        outer = key + " " + val + ";";
      } else if (key[1] == "f") {
        blocks += jsToCss(val, key);
      } else {
        blocks += key + "{" + jsToCss(val, key[1] == "k" ? "" : selector) + "}";
      }
    } else if (typeof val == "object") {
      blocks += jsToCss(
        val,
        selector ? (
          // Go over the selector and replace the matching multiple selectors if any
          selector.replace(/([^,])+/g, (sel) => {
            return key.replace(/(^:.*)|([^,])+/g, (k) => {
              if (/&/.test(k))
                return k.replace(/&/g, sel);
              return sel ? sel + " " + k : k;
            });
          })
        ) : key
      );
    } else if (val != void 0) {
      key = /^--/.test(key) ? key : key.replace(/[A-Z]/g, "-$&").toLowerCase();
      current += key + ":" + val + ";";
    }
  }
  return outer + (selector && current ? selector + "{" + current + "}" : current) + blocks;
}
function stringify(data) {
  if (typeof data == "object") {
    let out = "";
    for (let p in data)
      out += p + stringify(data[p]);
    return out;
  } else {
    return data;
  }
}
function toHash(str) {
  let i = 0, out = 11;
  while (i < str.length)
    out = 101 * out + str.charCodeAt(i++) >>> 0;
  return "fc" + out;
}

// src/themes/flipclock/flipclock.css.ts
var css = useCss({
  "&.flip-clock": {
    "--border-radius": ".75rem",
    "--width": "1em",
    "--height": "1.45em",
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSize: "4.5em",
    userSelect: "none",
    textAlign: "center",
    position: "relative",
    width: "100%",
    display: "inline-flex",
    boxSizing: "border-box",
    alignItems: "flex-end",
    gap: ".25rem"
  },
  ".flip-clock-label": {
    fontSize: "1rem",
    marginBottom: ".5rem"
  },
  ".flip-clock-meridium": {
    lineHeight: "1em",
    top: "50%",
    left: "100%",
    flex: "0",
    width: "auto",
    textTransform: "uppercase",
    fontWeight: "200",
    transform: "translate(.5em, -50%)"
  },
  ".flip-clock-divider": {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "serif",
    color: "#333",
    ".flip-clock-divider-inner": {
      fontSize: "1.25em"
    }
  },
  ".flip-clock-group": {
    display: "flex",
    flexDirection: "column",
    "+ .flip-clock-group": {
      marginLeft: "1rem"
    },
    ".flip-clock-group-items": {
      display: "flex",
      alignItems: "stretch",
      gap: ".25rem"
    }
  },
  ".flip-clock-card": {
    width: "var(--width)",
    height: "var(--height)",
    position: "relative",
    borderRadius: "var(--border-radius)",
    boxShadow: "0 1.5px 3px rgba(0, 0, 0, 0.24), 0 3px 8px rgba(0, 0, 0, 0.05)",
    fontWeight: "bold",
    color: "#ccc",
    flexShrink: 0,
    "&:not(.animate)": {
      ".active .flip-clock-card-item-inner": {
        zIndex: "4"
      },
      ".flip-clock-card-item-inner": {
        ".top, .bottom": {
          "&:after": {
            display: "none"
          }
        }
      }
    },
    ".flip-clock-card-item-inner": {
      position: "absolute",
      width: "100%",
      height: "100%",
      "&:first-child": {
        zIndex: "2"
      },
      ".top, .bottom": {
        width: "100%",
        height: "50%",
        overflow: "hidden",
        position: "relative",
        fontSize: "1em",
        background: "#333",
        boxShadow: "inset 0 0 .2em rgba(0,0,0,.5)",
        "&:after": {
          content: '" "',
          display: "block",
          position: "absolute",
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
          overflow: "hidden"
        },
        "&:before": {
          content: '" "',
          display: "block",
          width: "100%",
          height: "1px",
          position: "absolute"
        }
      },
      ".top": {
        borderRadius: "var(--border-radius) var(--border-radius) 0 0",
        lineHeight: "var(--height)",
        "&:after": {
          borderRadius: "var(--border-radius) var(--border-radius) 0 0"
        },
        "&:before": {
          background: "#333",
          opacity: ".4",
          bottom: "0"
        }
      },
      ".bottom": {
        borderRadius: "0 0 var(--border-radius) var(--border-radius)",
        lineHeight: "0",
        "&:after": {
          borderRadius: "0 0 var(--border-radius) var(--border-radius)"
        },
        "&:before": {
          background: "#ccc",
          opacity: ".1"
        }
      }
    },
    "&.animate": {
      animationDuration: "250ms",
      animationDelay: "250ms",
      ".flip-clock-card-item-inner": {
        perspective: "15em"
      },
      ".top, .bottom, .active, .active > div, .before, .before > div": {
        animationDelay: "inherit",
        animationFillMode: "forwards",
        animationDuration: "inherit",
        animationTimingFunction: "inherit",
        "&:after": {
          animationDuration: "inherit",
          animationFillMode: "inherit"
        }
      },
      ".before": {
        animationDelay: "0s",
        animationTimingFunction: "ease-in",
        ".top": {
          animationName: "flip-clock-top"
        },
        ".top:after, .bottom:after": {
          animationName: "flip-clock-show-shadow"
        }
      },
      ".active": {
        animationTimingFunction: "ease-out",
        "& > div": {
          animationName: "flip-clock-indexing"
        },
        ".top:after, .bottom:after": {
          animationName: "flip-clock-hide-shadow"
        },
        ".bottom": {
          animationName: "flip-clock-bottom"
        }
      }
    },
    ".active": {
      zIndex: "2",
      ".bottom": {
        zIndex: "2",
        transformOrigin: "top center"
      }
    },
    ".before": {
      zIndex: "3",
      ".top": {
        zIndex: "2",
        transformOrigin: "bottom center",
        "&:after": {
          background: "linear-gradient(to bottom, rgba(0,0,0,.1) 0%, rgba(0,0,0,1) 100%)"
        }
      },
      ".bottom": {
        "&:after": {
          background: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,.1) 100%)"
        }
      }
    }
  },
  "@keyframes flip-clock-indexing": {
    "0%": {
      zIndex: "2"
    },
    "1%": {
      zIndex: "3"
    },
    "100%": {
      zIndex: "4"
    }
  },
  "@keyframes flip-clock-bottom": {
    "0%": {
      transform: "rotateX(90deg)"
    },
    "100%": {
      transform: "rotateX(0)"
    }
  },
  "@keyframes flip-clock-top": {
    "0%": {
      transform: "rotateX(0)"
    },
    "100%": {
      transform: "rotateX(-90deg)"
    }
  },
  "@keyframes flip-clock-show-shadow": {
    "0%": {
      opacity: "0"
    },
    "100%": {
      opacity: "1"
    }
  },
  "@keyframes flip-clock-hide-shadow": {
    "0%": {
      opacity: "1"
    },
    "100%": {
      opacity: "0"
    }
  }
});

// vite.config.ts
var __vite_injected_original_dirname = "/Users/justinkimbrell/Code/flipclock";
var writeCssFiles = {
  "flipclock.css": css.toString()
};
var vite_config_default = defineConfig({
  build: {
    minify: "esbuild",
    lib: {
      entry: {
        flipclock: resolve2(__vite_injected_original_dirname, "index.ts")
      },
      formats: ["es", "cjs"],
      fileName: (format, name) => {
        return `${name}.${format}.js`;
      }
    }
  },
  plugins: [
    dts({
      rollupTypes: false,
      async afterBuild() {
        await extractTypes();
        for (const [key, value] of Object.entries(writeCssFiles)) {
          await writeFile2(resolve2(`./dist/${key}`), value);
        }
      }
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiLmJpbi9leHRyYWN0VHlwZXMudHMiLCAic3JjL2hlbHBlcnMvc2lnbmFsLnRzIiwgInNyYy9oZWxwZXJzL3JlZi50cyIsICJzcmMvaGVscGVycy9jc3MudHMiLCAic3JjL3RoZW1lcy9mbGlwY2xvY2svZmxpcGNsb2NrLmNzcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9qdXN0aW5raW1icmVsbC9Db2RlL2ZsaXBjbG9ja1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2p1c3RpbmtpbWJyZWxsL0NvZGUvZmxpcGNsb2NrL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9qdXN0aW5raW1icmVsbC9Db2RlL2ZsaXBjbG9jay92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IHdyaXRlRmlsZSB9IGZyb20gJ25vZGU6ZnMvcHJvbWlzZXMnO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cyc7XG5pbXBvcnQgeyBleHRyYWN0VHlwZXMgfSBmcm9tICcuLy5iaW4vZXh0cmFjdFR5cGVzJztcbmltcG9ydCB7IGNzcyB9IGZyb20gJy4vc3JjL3RoZW1lcy9mbGlwY2xvY2svZmxpcGNsb2NrLmNzcyc7XG5cbmNvbnN0IHdyaXRlQ3NzRmlsZXMgPSB7XG4gICAgJ2ZsaXBjbG9jay5jc3MnOiBjc3MudG9TdHJpbmcoKVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBidWlsZDoge1xuICAgICAgICBtaW5pZnk6ICdlc2J1aWxkJyxcbiAgICAgICAgbGliOiB7XG4gICAgICAgICAgICBlbnRyeToge1xuICAgICAgICAgICAgICAgIGZsaXBjbG9jazogcmVzb2x2ZShfX2Rpcm5hbWUsICdpbmRleC50cycpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZvcm1hdHM6IFsnZXMnLCAnY2pzJ10sXG4gICAgICAgICAgICBmaWxlTmFtZTogKGZvcm1hdCwgbmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBgJHtuYW1lfS4ke2Zvcm1hdH0uanNgO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHBsdWdpbnM6IFtcbiAgICAgICAgZHRzKHtcbiAgICAgICAgICAgIHJvbGx1cFR5cGVzOiBmYWxzZSxcbiAgICAgICAgICAgIGFzeW5jIGFmdGVyQnVpbGQoKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgZXh0cmFjdFR5cGVzKCk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyh3cml0ZUNzc0ZpbGVzKSkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCB3cml0ZUZpbGUocmVzb2x2ZShgLi9kaXN0LyR7a2V5fWApLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgXVxufSk7IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvanVzdGlua2ltYnJlbGwvQ29kZS9mbGlwY2xvY2svLmJpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2p1c3RpbmtpbWJyZWxsL0NvZGUvZmxpcGNsb2NrLy5iaW4vZXh0cmFjdFR5cGVzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9qdXN0aW5raW1icmVsbC9Db2RlL2ZsaXBjbG9jay8uYmluL2V4dHJhY3RUeXBlcy50c1wiO2ltcG9ydCB7IGV4aXN0c1N5bmMgfSBmcm9tICdub2RlOmZzJztcbmltcG9ydCB7IG1rZGlyLCBybSwgd3JpdGVGaWxlIH0gZnJvbSAnbm9kZTpmcy9wcm9taXNlcyc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBQcm9qZWN0LCBTb3VyY2VGaWxlIH0gZnJvbSBcInRzLW1vcnBoXCI7XG5cbmNvbnN0IHNvdXJjZUZpbGU6IFNvdXJjZUZpbGUgPSBuZXcgUHJvamVjdCh7XG4gICAgdHNDb25maWdGaWxlUGF0aDogJy4vdHNjb25maWcuanNvbidcbn0pLmFkZFNvdXJjZUZpbGVBdFBhdGgoJy4vZGlzdC9pbmRleC5kLnRzJyk7XG5cbmNvbnN0IGJhc2VEaXIgPSByZXNvbHZlKCcuL2RvY3MvdHlwZXMnKTtcblxuY29uc3QgZXh0ZW5zaW9uczogUmVjb3JkPHN0cmluZyxzdHJpbmc+ID0ge1xuICAnUHJvcGVydHlEZWNsYXJhdGlvbic6ICcucHJvcC50cycsXG4gICdQcm9wZXJ0eVNpZ25hdHVyZSc6ICcucHJvcC50cycsXG4gICdDbGFzc0RlY2xhcmF0aW9uJzogJy5jbGFzcy50cycsXG4gICdNZW1iZXJEZWNsYXJhdGlvbic6ICcubWVtYmVyLnRzJyxcbiAgJ01ldGhvZERlY2xhcmF0aW9uJzogJy5tZXRob2QudHMnLFxuICAnRnVuY3Rpb25EZWNsYXJhdGlvbic6ICcuZnVuY3Rpb24udHMnLFxuICAnVHlwZUFsaWFzRGVjbGFyYXRpb24nOiAnLnR5cGUudHMnLFxuICAnSW50ZXJmYWNlRGVjbGFyYXRpb24nOiAnLmludGVyZmFjZS50cycsXG4gICdWYXJpYWJsZURlY2xhcmF0aW9uJzogJy52YXIudHMnXG59XG5cbmNvbnN0IENPTU1FTlRfUkVHRVggPSAvKGV4cG9ydChcXHMrKT8pPyhkZWNsYXJlKFxccys/KSk/LztcblxuY29uc3QgRVhQT1JUX1JFR0VYID0gL2V4cG9ydD8oXFxzKyk/KGRlY2xhcmUpKFxccyspPy87XG5cbmZ1bmN0aW9uIGdyb3VwQnk8VCBleHRlbmRzIG9iamVjdFtdPihhcnJheTogVCwga2V5OiBzdHJpbmcpIHtcbiAgcmV0dXJuIGFycmF5XG4gICAgLnJlZHVjZSgoaGFzaCwgb2JqKSA9PiB7XG4gICAgICBpZihvYmpba2V5XSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gaGFzaDsgXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihoYXNoLCB7IFtvYmpba2V5XV06KCBoYXNoW29ialtrZXldXSB8fCBbXSApLmNvbmNhdChvYmopfSlcbiAgICB9LCB7fSlcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4dHJhY3RUeXBlcygpIHtcbiAgaWYoZXhpc3RzU3luYyhiYXNlRGlyKSkge1xuICAgIGF3YWl0IHJtKGJhc2VEaXIsIHtcbiAgICAgIHJlY3Vyc2l2ZTogdHJ1ZSxcbiAgICAgIGZvcmNlOiB0cnVlXG4gICAgfSlcbiAgfVxuXG4gIGF3YWl0IG1rZGlyKGJhc2VEaXIpO1xuXG4gIGZvcihjb25zdCBba2V5LCBkZWNvcmF0aW9uc10gb2Ygc291cmNlRmlsZS5nZXRFeHBvcnRlZERlY2xhcmF0aW9ucygpKSB7XG4gICAgY29uc3QgZGVjbGFyYXRpb25zOiBSZWNvcmQ8c3RyaW5nLCB7ZmlsZW5hbWU6IHN0cmluZywgY29udGVudHM6IHN0cmluZ31bXT4gPSB7fTtcblxuICAgIGZvcihjb25zdCBkZWNvcmF0aW9uIG9mIGRlY29yYXRpb25zKSB7XG4gICAgICBjb25zdCBraW5kTmFtZSA9IGRlY29yYXRpb24uZ2V0S2luZE5hbWUoKTtcblxuICAgICAgaWYoa2luZE5hbWUgPT09ICdWYXJpYWJsZURlY2xhcmF0aW9uJykge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYoIWRlY2xhcmF0aW9uc1traW5kTmFtZV0pIHtcbiAgICAgICAgZGVjbGFyYXRpb25zW2tpbmROYW1lXSA9IFtdO1xuICAgICAgfVxuICAgICAgICAgIFxuICAgICAgaWYoJ2dldFByb3BlcnRpZXMnIGluIGRlY29yYXRpb24pIHtcbiAgICAgICAgZm9yKGNvbnN0IHByb3Agb2YgZGVjb3JhdGlvbi5nZXRQcm9wZXJ0aWVzKCkpIHtcbiAgICAgICAgICBpZighZGVjbGFyYXRpb25zW3Byb3AuZ2V0S2luZE5hbWUoKV0pIHtcbiAgICAgICAgICAgIGRlY2xhcmF0aW9uc1twcm9wLmdldEtpbmROYW1lKCldID0gW107XG4gICAgICAgICAgfVxuICAgIFxuICAgICAgICAgIGRlY2xhcmF0aW9uc1twcm9wLmdldEtpbmROYW1lKCldLnB1c2goe1xuICAgICAgICAgICAgZmlsZW5hbWU6IGAke2tleX0uJHtwcm9wLmdldE5hbWUoKX1gLFxuICAgICAgICAgICAgY29udGVudHM6IHByb3BcbiAgICAgICAgICAgICAgLmdldFRleHQoKVxuICAgICAgICAgICAgICAucmVwbGFjZShDT01NRU5UX1JFR0VYLCAnJylcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZignZ2V0TWV0aG9kcycgaW4gZGVjb3JhdGlvbikge1xuICAgICAgICBmb3IoY29uc3QgcHJvcCBvZiBkZWNvcmF0aW9uLmdldE1ldGhvZHMoKSkge1xuICAgICAgICAgIGlmKCFkZWNsYXJhdGlvbnNbcHJvcC5nZXRLaW5kTmFtZSgpXSkge1xuICAgICAgICAgICAgZGVjbGFyYXRpb25zW3Byb3AuZ2V0S2luZE5hbWUoKV0gPSBbXTtcbiAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgZGVjbGFyYXRpb25zW3Byb3AuZ2V0S2luZE5hbWUoKV0ucHVzaCh7XG4gICAgICAgICAgICBmaWxlbmFtZTogYCR7a2V5fS4ke3Byb3AuZ2V0TmFtZSgpfWAsXG4gICAgICAgICAgICBjb250ZW50czogcHJvcFxuICAgICAgICAgICAgICAuZ2V0VGV4dCgpXG4gICAgICAgICAgICAgIC5yZXBsYWNlKENPTU1FTlRfUkVHRVgsICcnKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGRlY2xhcmF0aW9uc1traW5kTmFtZV0ucHVzaCh7XG4gICAgICAgIGZpbGVuYW1lOiBrZXksXG4gICAgICAgIGNvbnRlbnRzOiBkZWNvcmF0aW9uXG4gICAgICAgICAgLmdldFRleHQoKVxuICAgICAgICAgIC5yZXBsYWNlKENPTU1FTlRfUkVHRVgsICcnKVxuICAgICAgICAgIC5yZXBsYWNlKEVYUE9SVF9SRUdFWCwgJycpXG4gICAgICAgICAgLnRyaW0oKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZm9yKGNvbnN0IFtraW5kTmFtZSwgZmlsZXNdIG9mIE9iamVjdC5lbnRyaWVzKGRlY2xhcmF0aW9ucykpIHtcbiAgICAgIGNvbnN0IGdyb3VwcyA9IGdyb3VwQnkoZmlsZXMsICdmaWxlbmFtZScpO1xuXG4gICAgICBmb3IoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGdyb3VwcykpIHtcbiAgICAgICAgY29uc3QgY29udGVudHMgPSB2YWx1ZS5tYXAoKHsgY29udGVudHMgfSkgPT4gY29udGVudHMpLmpvaW4oJ1xcbicpO1xuICAgICAgICBjb25zdCBwYXRoID0gcmVzb2x2ZShiYXNlRGlyLCBgJHtrZXl9JHtleHRlbnNpb25zW2tpbmROYW1lXSA/PyAnLnRzJ31gKTtcblxuICAgICAgICBhd2FpdCB3cml0ZUZpbGUocGF0aCwgY29udGVudHMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2p1c3RpbmtpbWJyZWxsL0NvZGUvZmxpcGNsb2NrL3NyYy9oZWxwZXJzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvanVzdGlua2ltYnJlbGwvQ29kZS9mbGlwY2xvY2svc3JjL2hlbHBlcnMvc2lnbmFsLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9qdXN0aW5raW1icmVsbC9Db2RlL2ZsaXBjbG9jay9zcmMvaGVscGVycy9zaWduYWwudHNcIjtsZXQgY3VycmVudExpc3RlbmVyOiAoKCkgPT4gdm9pZCl8dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSB0dXBsZSB0aGF0IGlzIHJldHVybmVkIHdoZW4gY3JlYXRpbmcgYSBzaWduYWwuXG4gKiBcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IHR5cGUgU2lnbmFsPFQ+ID0gW1NpZ25hbFJlYWRGdW5jdGlvbjxUPiwgU2lnbmFsV3JpdGVGdW5jdGlvbjxUPiwgU2lnbmFsUmVzZXRGdW5jdGlvbjxUPl07XG5cbi8qKlxuICogVGhlIHNpZ25hbCdzIHJlYWQgZnVuY3Rpb24uXG4gKiBcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IHR5cGUgU2lnbmFsUmVhZEZ1bmN0aW9uPFQ+ID0gKCkgPT4gVDtcblxuLyoqXG4gKiBUaGUgc2lnbmFsJ3Mgd3JpdGUgZnVuY3Rpb24uXG4gKiBcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IHR5cGUgU2lnbmFsV3JpdGVGdW5jdGlvbjxUPiA9ICh2YWx1ZTogVCkgPT4gdm9pZDtcblxuLyoqXG4gKiBUaGUgc2lnbmFsJ3MgcmVzZXQgZnVuY3Rpb24uXG4gKiBcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IHR5cGUgU2lnbmFsUmVzZXRGdW5jdGlvbjxUPiA9ICgpID0+IFQ7XG5cbi8qKlxuICogQ3JlYXRlIGEgc2lnbmFsLlxuICogXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTaWduYWw8VD4oaW5pdGlhbFZhbHVlOiBUKTogU2lnbmFsPFQ+IFxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNpZ25hbDxUPihpbml0aWFsVmFsdWU/OiBUKTogU2lnbmFsPFR8dW5kZWZpbmVkPiBcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTaWduYWw8VD4oaW5pdGlhbFZhbHVlPzogVCk6IFNpZ25hbDxUfHVuZGVmaW5lZD4ge1xuICAgIGxldCB2YWx1ZTogVHx1bmRlZmluZWQgPSBpbml0aWFsVmFsdWU7XG5cbiAgICBjb25zdCBzdWJzY3JpYmVyczogRnVuY3Rpb25bXSA9IFtdO1xuXG4gICAgZnVuY3Rpb24gcmVhZCgpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgc3Vic2NyaWJlcnMucHVzaChjdXJyZW50TGlzdGVuZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB3cml0ZShuZXdWYWx1ZT86IFQpIHtcbiAgICAgICAgdmFsdWUgPSBuZXdWYWx1ZTtcblxuICAgICAgICBzdWJzY3JpYmVycy5mb3JFYWNoKGZuID0+IGZuKCkpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgICAgdmFsdWUgPSBpbml0aWFsVmFsdWU7XG5cbiAgICAgICAgc3Vic2NyaWJlcnMuc3BsaWNlKDAsIHN1YnNjcmliZXJzLmxlbmd0aCk7XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG5cbiAgICByZXR1cm4gW3JlYWQsIHdyaXRlLCByZXNldF07XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgc2lnbmFsIFwid2F0Y2hcIiBlZmZlY3QuXG4gKiBcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdhdGNoRWZmZWN0KGNhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XG4gICAgY3VycmVudExpc3RlbmVyID0gY2FsbGJhY2s7XG4gICAgY2FsbGJhY2soKTtcbiAgICBjdXJyZW50TGlzdGVuZXIgPSB1bmRlZmluZWQ7XG59XG5cblxudHlwZSBDYW48VCBleHRlbmRzIGFueVtdPiA9IHtcbiAgICBjcmVhdGU6IGJvb2xlYW5cbn0gJiB7XG4gICAgW0sgaW4gVFtudW1iZXJdXTogYm9vbGVhblxufVxuXG5jb25zdCBhOiBDYW48Wyd1cGRhdGUnXT4gPSB7XG4gICAgY3JlYXRlOiB0cnVlLFxuICAgIHVwZGF0ZTogdHJ1ZVxufTsiLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9qdXN0aW5raW1icmVsbC9Db2RlL2ZsaXBjbG9jay9zcmMvaGVscGVyc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2p1c3RpbmtpbWJyZWxsL0NvZGUvZmxpcGNsb2NrL3NyYy9oZWxwZXJzL3JlZi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvanVzdGlua2ltYnJlbGwvQ29kZS9mbGlwY2xvY2svc3JjL2hlbHBlcnMvcmVmLnRzXCI7aW1wb3J0IHsgY3JlYXRlU2lnbmFsIH0gZnJvbSAnLi9zaWduYWwnO1xuXG4vKipcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IHR5cGUgUmVmPFQ+ID0ge1xuXHR2YWx1ZTogVFxufVxuXG4vKipcbiAqIENyZWF0ZSBhIHJlZi5cbiAqIFxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmVmPFQ+KHZhbHVlOiBUKTogUmVmPFQ+XG5leHBvcnQgZnVuY3Rpb24gcmVmPFQ+KHZhbHVlPzogVCk6IFJlZjxUfHVuZGVmaW5lZD5cbmV4cG9ydCBmdW5jdGlvbiByZWY8VD4odmFsdWU6IFQpOiBSZWY8VHx1bmRlZmluZWQ+IHtcbiAgICBjb25zdCBbIGdldFZhbHVlLCBzZXRWYWx1ZSBdID0gY3JlYXRlU2lnbmFsKHZhbHVlKTtcblxuICAgIHJldHVybiBuZXcgUHJveHkoeyB2YWx1ZSB9LCB7XG4gICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRWYWx1ZSgpO1xuICAgICAgICB9LFxuICAgICAgICBzZXQodGFyZ2V0LCBfLCB2YWx1ZTogVCkge1xuICAgICAgICAgICAgdGFyZ2V0LnZhbHVlID0gdmFsdWU7XG5cbiAgICAgICAgICAgIHNldFZhbHVlKHZhbHVlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuLyoqXG4gKiBBIGNvbXB1dGVkIGdldHRlci5cbiAqIFxuICogQHB1YmxpY1xuICovXG5leHBvcnQgdHlwZSBDb21wdXRlZEdldHRlcjxUPiA9ICgpID0+IFQ7XG5cbi8qKlxuICogQSBjb21wdXRlZCBnZXR0ZXIgYW5kIHNldHRlci5cbiAqIFxuICogQHB1YmxpY1xuICovXG5leHBvcnQgdHlwZSBDb21wdXRlZEdldHRlclNldHRlcjxUPiA9IHtcblx0Z2V0KCk6IFQsXG5cdHNldCh2YWx1ZTogVCk6IHZvaWRcbn07XG5cbi8qKlxuICogQSBjb21wdXRlZCByZWYuXG4gKiBcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IHR5cGUgQ29tcHV0ZWRSZWY8VD4gPSBSZWFkb25seTxSZWY8VD4+XG5cbi8qKlxuICogQSB3cml0ZWFibGUgY29tcHV0ZWQgcmVmLlxuICogXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCB0eXBlIFdyaXRlYWJsZUNvbXB1dGVkUmVmPFQ+ID0gUmVmPFQ+XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlZDxUPihwcm94eTogQ29tcHV0ZWRHZXR0ZXJTZXR0ZXI8VD4pOiBXcml0ZWFibGVDb21wdXRlZFJlZjxUPlxuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVkPFQ+KGZuOiBDb21wdXRlZEdldHRlcjxUPik6IENvbXB1dGVkUmVmPFQ+XG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZWQ8VD4oZm46IENvbXB1dGVkR2V0dGVyPFQ+IHwgQ29tcHV0ZWRHZXR0ZXJTZXR0ZXI8VD4pIHtcbiAgICByZXR1cm4gdHlwZW9mIGZuID09PSAnZnVuY3Rpb24nID8ge1xuICAgICAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgICAgICByZXR1cm4gZm4oKTtcbiAgICAgICAgfVxuICAgIH0gOiB7XG4gICAgICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBmbi5nZXQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgICAgICAgICBmbi5zZXQodmFsdWUpO1xuICAgICAgICB9XG4gICAgfTtcbn0iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9qdXN0aW5raW1icmVsbC9Db2RlL2ZsaXBjbG9jay9zcmMvaGVscGVyc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2p1c3RpbmtpbWJyZWxsL0NvZGUvZmxpcGNsb2NrL3NyYy9oZWxwZXJzL2Nzcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvanVzdGlua2ltYnJlbGwvQ29kZS9mbGlwY2xvY2svc3JjL2hlbHBlcnMvY3NzLnRzXCI7aW1wb3J0IHsgdHlwZSBQcm9wZXJ0aWVzIH0gZnJvbSAnY3NzdHlwZSc7XG5pbXBvcnQgeyBjb21wdXRlZCwgcmVmLCB0eXBlIFJlZiB9IGZyb20gJy4vcmVmJztcbmltcG9ydCB7IHdhdGNoRWZmZWN0IH0gZnJvbSAnLi9zaWduYWwnO1xuXG4vKipcbiAqIEEgQ1NTLWluLUpTIHN0eWxlIG9iamVjdC5cbiAqIFxuICogQHB1YmxpY1xuICovXG5leHBvcnQgaW50ZXJmYWNlIENTU1Byb3BlcnRpZXMgZXh0ZW5kcyBQcm9wZXJ0aWVzIHtcbiAgICBba2V5OiBzdHJpbmddOiBDU1NQcm9wZXJ0aWVzIHwgc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkIHwgbnVsbDtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIEZsaXBDbG9jayBzdHlsZXNoZWV0IG9yIGNyZWF0ZSBhbmQgYXBwZW5kIGEgbmV3IG9uZS5cbiAqIFxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2hlZXQoKTogSFRNTFN0eWxlRWxlbWVudCB7XG4gICAgY29uc3QgZXhpc3RpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzdHlsZSNfX2ZsaXBjbG9ja19fJyk7XG5cbiAgICBpZiAoZXhpc3RpbmcgJiYgZXhpc3RpbmcgaW5zdGFuY2VvZiBIVE1MU3R5bGVFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBleGlzdGluZyBhcyBIVE1MU3R5bGVFbGVtZW50O1xuICAgIH1cblxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICAgIGVsLmlkID0gJ19fZmxpcGNsb2NrX18nO1xuXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChlbCk7XG5cbiAgICByZXR1cm4gZWw7XG59XG5cbi8qKlxuICogQGludGVybmFsXG4gKi9cbmNvbnN0IGNhY2hlZFN0cmluZ2lmaWVkQ3NzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XG5cbi8qKlxuICogQGludGVybmFsXG4gKi9cbmNvbnN0IGNhY2hlZEhhc2hlZENzczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xuXG4vKipcbiAqIE1lcmdlIHRoZSB0YXJnZXQgb2JqZWN0IGludG8gdGhlIHNvdXJjZS5cbiAqIFxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VDc3Moc291cmNlOiBDU1NQcm9wZXJ0aWVzLCB0YXJnZXQ6IENTU1Byb3BlcnRpZXMpOiBDU1NQcm9wZXJ0aWVzIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0YXJnZXQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2Vba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHRhcmdldFtrZXldID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgc291cmNlW2tleV0gPSBtZXJnZUNzcyhcbiAgICAgICAgICAgICAgICBzb3VyY2Vba2V5XSBhcyBDU1NQcm9wZXJ0aWVzLFxuICAgICAgICAgICAgICAgIHRhcmdldFtrZXldIGFzIENTU1Byb3BlcnRpZXMsXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc291cmNlW2tleV0gPSB0YXJnZXRba2V5XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzb3VyY2U7XG59XG5cbi8qKlxuICogVGhlIHJldHVybiB2YWx1ZSBmb3IgYHVzZUNzcygpYC5cbiAqIFxuICogQHB1YmxpY1xuICovXG5leHBvcnQgdHlwZSBVc2VDc3MgPSB7XG4gICAgY3NzOiBSZWY8Q1NTUHJvcGVydGllcz47XG4gICAgaGFzaDogUmVmPHN0cmluZz47XG4gICAgbWVyZ2U6ICh0YXJnZXQ6IENTU1Byb3BlcnRpZXMpID0+IFVzZUNzcztcbiAgICBleHRlbmQ6ICh0YXJnZXQ6IENTU1Byb3BlcnRpZXMpID0+IFVzZUNzcztcbiAgICB0b1N0cmluZzogKCkgPT4gc3RyaW5nXG59XG5cbi8qKlxuICogQSBjb21wb3NhYmxlIGZvciB1c2luZyBDU1MuXG4gKiBcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUNzcyhzb3VyY2U6IENTU1Byb3BlcnRpZXMpOiBVc2VDc3Mge1xuICAgIGNvbnN0IGNzcyA9IHJlZihzb3VyY2UpO1xuXG4gICAgY29uc3QgaGFzaCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgICAgY29uc3Qgc3RyaW5naWZpZWQgPSBzdHJpbmdpZnkoY3NzLnZhbHVlKTtcblxuICAgICAgICBpZiAoY2FjaGVkU3RyaW5naWZpZWRDc3Nbc3RyaW5naWZpZWRdKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU3RyaW5naWZpZWRDc3Nbc3RyaW5naWZpZWRdO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaGFzaCA9IHRvSGFzaChzdHJpbmdpZmllZCk7XG5cbiAgICAgICAgY2FjaGVkU3RyaW5naWZpZWRDc3Nbc3RyaW5naWZpZWRdID0gaGFzaDtcblxuICAgICAgICByZXR1cm4gaGFzaDtcbiAgICB9KTtcblxuICAgIHdhdGNoRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGlmICghY2FjaGVkSGFzaGVkQ3NzW2hhc2gudmFsdWVdKSB7XG4gICAgICAgICAgICAgICAgY2FjaGVkSGFzaGVkQ3NzW2hhc2gudmFsdWVdID0ganNUb0Nzcyhjc3MudmFsdWUsIGAuJHtoYXNoLnZhbHVlfWApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzaGVldCgpLmlubmVySFRNTCA9IE9iamVjdC52YWx1ZXMoY2FjaGVkSGFzaGVkQ3NzKS5qb2luKCcnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY29udGV4dDogVXNlQ3NzID0ge1xuICAgICAgICBjc3MsXG4gICAgICAgIGhhc2gsXG4gICAgICAgIG1lcmdlKHRhcmdldDogQ1NTUHJvcGVydGllcykge1xuICAgICAgICAgICAgY3NzLnZhbHVlID0gbWVyZ2VDc3MoY3NzLnZhbHVlLCB0YXJnZXQpO1xuXG4gICAgICAgICAgICByZXR1cm4gY29udGV4dDtcbiAgICAgICAgfSxcbiAgICAgICAgZXh0ZW5kKHRhcmdldDogQ1NTUHJvcGVydGllcykge1xuICAgICAgICAgICAgcmV0dXJuIHVzZUNzcyhtZXJnZUNzcyhjc3MudmFsdWUsIHRhcmdldCkpO1xuICAgICAgICB9LFxuICAgICAgICB0b1N0cmluZygpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRIYXNoZWRDc3NbaGFzaC52YWx1ZV07XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIGNvbnRleHQ7XG59XG5cbi8qKlxuICogQ29udmVydCB0aGUgQ1NTIHByb3BlcnRpZXMgaW50byBjYW1lbCBjYXNlLlxuICogXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW1lbENhc2VQcm9wcyh2YWx1ZXM6IENTU1Byb3BlcnRpZXMpIHtcbiAgICBmb3IgKGNvbnN0IGkgaW4gdmFsdWVzKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdmFsdWVzW2ldO1xuXG4gICAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB2YWx1ZXNbaV0gPSBjYW1lbENhc2VQcm9wcyh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIWkubWF0Y2goL14tLykpIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IE9iamVjdC5mcm9tRW50cmllcyhcbiAgICAgICAgICAgICAgICBPYmplY3QuZW50cmllcyh2YWx1ZXMpLm1hcCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgIT09IGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBba2V5LCB2YWx1ZV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBba2V5LnRvTG93ZXJDYXNlKCkucmVwbGFjZShcbiAgICAgICAgICAgICAgICAgICAgICAgIC9bXmEtekEtWjAtOV0rKC4pL2csIChfLCBjaHIpID0+IGNoci50b1VwcGVyQ2FzZSgpXG4gICAgICAgICAgICAgICAgICAgICksIHZhbHVlXTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZXM7XG59XG5cbi8qKlxuICogR29vYmVyLmlzIGEgZmFudGFzdGljIGxpYnJhcnkgaW4gd2hpY2ggd2UgdG9vayBpbnNwaXJhdGlvbi4gVGhlIGNvZGUgYmVsb3dcbiAqIHRoaXMgY29tbWVudCB3YXMgdGFrZW4gZnJvbSBHb29iZXIuanMgSWYgdGhlIGdvYWwgd2Fzbid0IHplcm8gZGVwZW5kZW5jaWVzLFxuICogd2Ugd291bGQgaGF2ZSB1c2VkIGl0LiBCdXQgd2Ugb25seSBuZWVkIGEgZmV3IGZ1bmN0aW9ucywgc28gY29uc2lkZXIgdGhpcyBhXG4gKiBmb3JrIGEgdGhlc2UgZnVuY3Rpb25zLlxuICogXG4gKiBNSVQgTGljZW5zZVxuICogXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTkgQ3Jpc3RpYW4gQm90ZVxuICogXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKiAgXG4gKiBodHRwczovL2dvb2Jlci5qcy5vcmcvXG4gKi9cblxuLyoqXG4gKiBDb252ZXJ0IGEgY3NzIHN0eWxlIHN0cmluZyBpbnRvIGEgb2JqZWN0LiBUaGlzIGZ1bmN0aW9uIGRldmlhdGVzIGZyb21cbiAqIGdvb2Jlci5qcyBpbiB0aGF0IFxcbiBvciA7IHdpbGwgcGFyc2UgdGhlIHNhbWUgb24gcnVsZXMuXG4gKiBcbiAqIEBwdWJsaWMgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjc3NUb0pzKHZhbDogc3RyaW5nKTogb2JqZWN0IHtcbiAgICBjb25zdCBuZXdSdWxlID0gLyg/OihbXFx1MDA4MC1cXHVGRkZGXFx3LSVAXSspICo6PyAqKFteeztdKz8pKD86O3xcXG4pfChbXjt9e10qPykgKnspfCh9XFxzKikvZztcbiAgICBjb25zdCBydWxlQ2xlYW4gPSAvXFwvXFwqW15dKj9cXCpcXC98ICArL2c7XG4gICAgY29uc3QgcnVsZU5ld2xpbmUgPSAvXFxuKy9nO1xuICAgIGNvbnN0IGVtcHR5ID0gJyAnO1xuXG4gICAgbGV0IHRyZWU6IGFueSA9IFt7fV07XG4gICAgbGV0IGJsb2NrLCBsZWZ0O1xuXG4gICAgd2hpbGUgKChibG9jayA9IG5ld1J1bGUuZXhlYyh2YWwucmVwbGFjZShydWxlQ2xlYW4sICcnKSkpKSB7XG4gICAgICAgIGlmIChibG9ja1s0XSkge1xuICAgICAgICAgICAgdHJlZS5zaGlmdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGJsb2NrWzNdKSB7XG4gICAgICAgICAgICBsZWZ0ID0gYmxvY2tbM10ucmVwbGFjZShydWxlTmV3bGluZSwgJycpLnRyaW0oKTtcbiAgICAgICAgICAgIHRyZWUudW5zaGlmdCgodHJlZVswXVtsZWZ0XSA9IHRyZWVbMF1bbGVmdF0gfHwge30pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyZWVbMF1bYmxvY2tbMV1dID0gYmxvY2tbMl0ucmVwbGFjZShydWxlTmV3bGluZSwgZW1wdHkpLnRyaW0oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjYW1lbENhc2VQcm9wcyh0cmVlWzBdKTtcbn07XG5cbi8qKlxuICogUGFyc2VzIHRoZSBvYmplY3QgaW50byBjc3MsIHNjb3BlZCwgYmxvY2tzLlxuICogXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBqc1RvQ3NzKG9iajogYW55LCBzZWxlY3Rvcj86IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IG91dGVyID0gJyc7XG4gICAgbGV0IGJsb2NrcyA9ICcnO1xuICAgIGxldCBjdXJyZW50ID0gJyc7XG5cbiAgICBmb3IgKGxldCBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGxldCB2YWwgPSBvYmpba2V5XTtcblxuICAgICAgICBpZiAoa2V5WzBdID09ICdAJykge1xuICAgICAgICAgICAgLy8gSWYgdGhlc2UgYXJlIHRoZSBgQGAgcnVsZVxuICAgICAgICAgICAgaWYgKGtleVsxXSA9PSAnaScpIHtcbiAgICAgICAgICAgICAgICAvLyBIYW5kbGluZyB0aGUgYEBpbXBvcnRgXG4gICAgICAgICAgICAgICAgb3V0ZXIgPSBrZXkgKyAnICcgKyB2YWwgKyAnOyc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleVsxXSA9PSAnZicpIHtcbiAgICAgICAgICAgICAgICAvLyBIYW5kbGluZyB0aGUgYEBmb250LWZhY2VgIHdoZXJlIHRoZVxuICAgICAgICAgICAgICAgIC8vIGJsb2NrIGRvZXNuJ3QgbmVlZCB0aGUgYnJhY2tldHMgd3JhcHBlZFxuICAgICAgICAgICAgICAgIGJsb2NrcyArPSBqc1RvQ3NzKHZhbCwga2V5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gUmVndWxhciBhdCBydWxlIGJsb2NrXG4gICAgICAgICAgICAgICAgYmxvY2tzICs9IGtleSArICd7JyArIGpzVG9Dc3ModmFsLCBrZXlbMV0gPT0gJ2snID8gJycgOiBzZWxlY3RvcikgKyAnfSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgLy8gQ2FsbCB0aGUgcGFyc2UgZm9yIHRoaXMgYmxvY2tcbiAgICAgICAgICAgIGJsb2NrcyArPSBqc1RvQ3NzKFxuICAgICAgICAgICAgICAgIHZhbCxcbiAgICAgICAgICAgICAgICBzZWxlY3RvclxuICAgICAgICAgICAgICAgICAgICA/IC8vIEdvIG92ZXIgdGhlIHNlbGVjdG9yIGFuZCByZXBsYWNlIHRoZSBtYXRjaGluZyBtdWx0aXBsZSBzZWxlY3RvcnMgaWYgYW55XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yLnJlcGxhY2UoLyhbXixdKSsvZywgKHNlbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBjdXJyZW50IHNlbGVjdG9yIHdpdGggdGhlIGtleSBtYXRjaGluZyBtdWx0aXBsZSBzZWxlY3RvcnMgaWYgYW55XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5LnJlcGxhY2UoLyheOi4qKXwoW14sXSkrL2csIChrKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIGN1cnJlbnQgYGtgKGtleSkgaGFzIGEgbmVzdGVkIHNlbGVjdG9yIHJlcGxhY2UgaXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoLyYvLnRlc3QoaykpIHJldHVybiBrLnJlcGxhY2UoLyYvZywgc2VsKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlJ3MgYSBjdXJyZW50IHNlbGVjdG9yIGNvbmNhdCBpdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWwgPyBzZWwgKyAnICcgKyBrIDogaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICA6IGtleVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWwgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBDb252ZXJ0IGFsbCBidXQgQ1NTIHZhcmlhYmxlc1xuICAgICAgICAgICAga2V5ID0gL14tLS8udGVzdChrZXkpID8ga2V5IDoga2V5LnJlcGxhY2UoL1tBLVpdL2csICctJCYnKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgLy8gUHVzaCB0aGUgbGluZSBmb3IgdGhpcyBwcm9wZXJ0eVxuICAgICAgICAgICAgY3VycmVudCArPSBrZXkgKyAnOicgKyB2YWwgKyAnOyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZiB3ZSBoYXZlIHByb3BlcnRpZXMgYXBwbHkgc3RhbmRhcmQgcnVsZSBjb21wb3NpdGlvblxuICAgIHJldHVybiBvdXRlciArIChzZWxlY3RvciAmJiBjdXJyZW50ID8gc2VsZWN0b3IgKyAneycgKyBjdXJyZW50ICsgJ30nIDogY3VycmVudCkgKyBibG9ja3M7XG59O1xuXG4vKipcbiAqIFN0cmluZ2lmeSBhbiBvYmplY3QuXG4gKiBcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeShkYXRhOiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIGRhdGEgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgbGV0IG91dCA9ICcnO1xuICAgICAgICBmb3IgKGxldCBwIGluIGRhdGEpIG91dCArPSBwICsgc3RyaW5naWZ5KGRhdGFbcF0pO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDb252ZXJ0IGEgc3RyaW5nIGludG8gYSBoYXNoLlxuICogXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0hhc2goc3RyOiBzdHJpbmcpIHtcbiAgICBsZXQgaSA9IDAsXG4gICAgICAgIG91dCA9IDExO1xuICAgIHdoaWxlIChpIDwgc3RyLmxlbmd0aCkgb3V0ID0gKDEwMSAqIG91dCArIHN0ci5jaGFyQ29kZUF0KGkrKykpID4+PiAwO1xuICAgIHJldHVybiAnZmMnICsgb3V0O1xufTsiLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9qdXN0aW5raW1icmVsbC9Db2RlL2ZsaXBjbG9jay9zcmMvdGhlbWVzL2ZsaXBjbG9ja1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2p1c3RpbmtpbWJyZWxsL0NvZGUvZmxpcGNsb2NrL3NyYy90aGVtZXMvZmxpcGNsb2NrL2ZsaXBjbG9jay5jc3MudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2p1c3RpbmtpbWJyZWxsL0NvZGUvZmxpcGNsb2NrL3NyYy90aGVtZXMvZmxpcGNsb2NrL2ZsaXBjbG9jay5jc3MudHNcIjtpbXBvcnQgeyB1c2VDc3MgfSBmcm9tICcuLi8uLi9oZWxwZXJzL2Nzcyc7XG5cbi8qKlxuICogVGhlIEZsaXBDbG9jayBUaGVtZSBDU1MuXG4gKiBcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IGNzcyA9IHVzZUNzcyh7XG4gICAgJyYuZmxpcC1jbG9jayc6IHtcbiAgICAgICAgJy0tYm9yZGVyLXJhZGl1cyc6ICcuNzVyZW0nLFxuICAgICAgICAnLS13aWR0aCc6ICcxZW0nLFxuICAgICAgICAnLS1oZWlnaHQnOiAnMS40NWVtJyxcbiAgICAgICAgZm9udEZhbWlseTogJ1wiSGVsdmV0aWNhIE5ldWVcIiwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmJyxcbiAgICAgICAgZm9udFNpemU6ICc0LjVlbScsXG4gICAgICAgIHVzZXJTZWxlY3Q6ICdub25lJyxcbiAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtZmxleCcsXG4gICAgICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICAgICAgICBhbGlnbkl0ZW1zOiAnZmxleC1lbmQnLFxuICAgICAgICBnYXA6ICcuMjVyZW0nXG4gICAgfSxcbiAgICAnLmZsaXAtY2xvY2stbGFiZWwnOiB7XG4gICAgICAgIGZvbnRTaXplOiAnMXJlbScsXG4gICAgICAgIG1hcmdpbkJvdHRvbTogJy41cmVtJyxcbiAgICB9LFxuICAgICcuZmxpcC1jbG9jay1tZXJpZGl1bSc6IHtcbiAgICAgICAgbGluZUhlaWdodDogJzFlbScsXG4gICAgICAgIHRvcDogJzUwJScsXG4gICAgICAgIGxlZnQ6ICcxMDAlJyxcbiAgICAgICAgZmxleDogJzAnLFxuICAgICAgICB3aWR0aDogJ2F1dG8nLFxuICAgICAgICB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJyxcbiAgICAgICAgZm9udFdlaWdodDogJzIwMCcsXG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSguNWVtLCAtNTAlKScgXG4gICAgfSxcbiAgICAnLmZsaXAtY2xvY2stZGl2aWRlcic6IHtcbiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgZm9udEZhbWlseTogJ3NlcmlmJyxcbiAgICAgICAgY29sb3I6ICcjMzMzJyxcbiAgICAgICAgJy5mbGlwLWNsb2NrLWRpdmlkZXItaW5uZXInOiB7XG4gICAgICAgICAgICBmb250U2l6ZTogJzEuMjVlbScgXG4gICAgICAgIH0gXG4gICAgfSxcbiAgICAnLmZsaXAtY2xvY2stZ3JvdXAnOiB7XG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgICAgICcrIC5mbGlwLWNsb2NrLWdyb3VwJzoge1xuICAgICAgICAgICAgbWFyZ2luTGVmdDogJzFyZW0nIFxuICAgICAgICB9LFxuICAgICAgICAnLmZsaXAtY2xvY2stZ3JvdXAtaXRlbXMnOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICBhbGlnbkl0ZW1zOiAnc3RyZXRjaCcsXG4gICAgICAgICAgICBnYXA6ICcuMjVyZW0nIFxuICAgICAgICB9XG4gICAgfSxcbiAgICAnLmZsaXAtY2xvY2stY2FyZCc6IHtcbiAgICAgICAgd2lkdGg6ICd2YXIoLS13aWR0aCknLFxuICAgICAgICBoZWlnaHQ6ICd2YXIoLS1oZWlnaHQpJyxcbiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgIGJvcmRlclJhZGl1czogJ3ZhcigtLWJvcmRlci1yYWRpdXMpJyxcbiAgICAgICAgYm94U2hhZG93OiAnMCAxLjVweCAzcHggcmdiYSgwLCAwLCAwLCAwLjI0KSwgMCAzcHggOHB4IHJnYmEoMCwgMCwgMCwgMC4wNSknLFxuICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgICAgIGNvbG9yOiAnI2NjYycsXG4gICAgICAgIGZsZXhTaHJpbms6IDAsXG4gICAgICAgICcmOm5vdCguYW5pbWF0ZSknOiB7XG4gICAgICAgICAgICAnLmFjdGl2ZSAuZmxpcC1jbG9jay1jYXJkLWl0ZW0taW5uZXInOiB7XG4gICAgICAgICAgICAgICAgekluZGV4OiAnNCcgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJy5mbGlwLWNsb2NrLWNhcmQtaXRlbS1pbm5lcic6IHtcbiAgICAgICAgICAgICAgICAnLnRvcCwgLmJvdHRvbSc6IHtcbiAgICAgICAgICAgICAgICAgICAgJyY6YWZ0ZXInOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnbm9uZScgXG4gICAgICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH0sXG4gICAgICAgICcuZmxpcC1jbG9jay1jYXJkLWl0ZW0taW5uZXInOiB7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgICcmOmZpcnN0LWNoaWxkJzoge1xuICAgICAgICAgICAgICAgIHpJbmRleDogJzInIFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICcudG9wLCAuYm90dG9tJzoge1xuICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnNTAlJyxcbiAgICAgICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICcxZW0nLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjMzMzJyxcbiAgICAgICAgICAgICAgICBib3hTaGFkb3c6ICdpbnNldCAwIDAgLjJlbSByZ2JhKDAsMCwwLC41KScsXG4gICAgICAgICAgICAgICAgJyY6YWZ0ZXInOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICdcIiBcIicsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgICB0b3A6ICcwJyxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICcwJyxcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnMCcsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICcwJyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nIFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJyY6YmVmb3JlJzoge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAnXCIgXCInLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxcHgnLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyBcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICcudG9wJzoge1xuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJ3ZhcigtLWJvcmRlci1yYWRpdXMpIHZhcigtLWJvcmRlci1yYWRpdXMpIDAgMCcsXG4gICAgICAgICAgICAgICAgbGluZUhlaWdodDogJ3ZhcigtLWhlaWdodCknLFxuICAgICAgICAgICAgICAgICcmOmFmdGVyJzoge1xuICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICd2YXIoLS1ib3JkZXItcmFkaXVzKSB2YXIoLS1ib3JkZXItcmFkaXVzKSAwIDAnIFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJyY6YmVmb3JlJzoge1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzMzMycsXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6ICcuNCcsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJzAnIFxuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJy5ib3R0b20nOiB7XG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMCAwIHZhcigtLWJvcmRlci1yYWRpdXMpIHZhcigtLWJvcmRlci1yYWRpdXMpJyxcbiAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMCcsXG4gICAgICAgICAgICAgICAgJyY6YWZ0ZXInOiB7XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzAgMCB2YXIoLS1ib3JkZXItcmFkaXVzKSB2YXIoLS1ib3JkZXItcmFkaXVzKScgXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnJjpiZWZvcmUnOiB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjY2NjJyxcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogJy4xJyBcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfSBcbiAgICAgICAgfSxcbiAgICAgICAgJyYuYW5pbWF0ZSc6IHtcbiAgICAgICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uOiAnMjUwbXMnLFxuICAgICAgICAgICAgYW5pbWF0aW9uRGVsYXk6ICcyNTBtcycsXG4gICAgICAgICAgICAnLmZsaXAtY2xvY2stY2FyZC1pdGVtLWlubmVyJzoge1xuICAgICAgICAgICAgICAgIHBlcnNwZWN0aXZlOiAnMTVlbScgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJy50b3AsIC5ib3R0b20sIC5hY3RpdmUsIC5hY3RpdmUgPiBkaXYsIC5iZWZvcmUsIC5iZWZvcmUgPiBkaXYnOiB7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uRGVsYXk6ICdpbmhlcml0JyxcbiAgICAgICAgICAgICAgICBhbmltYXRpb25GaWxsTW9kZTogJ2ZvcndhcmRzJyxcbiAgICAgICAgICAgICAgICBhbmltYXRpb25EdXJhdGlvbjogJ2luaGVyaXQnLFxuICAgICAgICAgICAgICAgIGFuaW1hdGlvblRpbWluZ0Z1bmN0aW9uOiAnaW5oZXJpdCcsXG4gICAgICAgICAgICAgICAgJyY6YWZ0ZXInOiB7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uOiAnaW5oZXJpdCcsXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkZpbGxNb2RlOiAnaW5oZXJpdCcgXG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnLmJlZm9yZSc6IHtcbiAgICAgICAgICAgICAgICBhbmltYXRpb25EZWxheTogJzBzJyxcbiAgICAgICAgICAgICAgICBhbmltYXRpb25UaW1pbmdGdW5jdGlvbjogJ2Vhc2UtaW4nLFxuICAgICAgICAgICAgICAgICcudG9wJzoge1xuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25OYW1lOiAnZmxpcC1jbG9jay10b3AnIFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJy50b3A6YWZ0ZXIsIC5ib3R0b206YWZ0ZXInOiB7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbk5hbWU6ICdmbGlwLWNsb2NrLXNob3ctc2hhZG93JyBcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICcuYWN0aXZlJzoge1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvblRpbWluZ0Z1bmN0aW9uOiAnZWFzZS1vdXQnLFxuICAgICAgICAgICAgICAgICcmID4gZGl2Jzoge1xuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25OYW1lOiAnZmxpcC1jbG9jay1pbmRleGluZycgXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnLnRvcDphZnRlciwgLmJvdHRvbTphZnRlcic6IHtcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uTmFtZTogJ2ZsaXAtY2xvY2staGlkZS1zaGFkb3cnIFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJy5ib3R0b20nOiB7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbk5hbWU6ICdmbGlwLWNsb2NrLWJvdHRvbScgXG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH0sXG4gICAgICAgICcuYWN0aXZlJzoge1xuICAgICAgICAgICAgekluZGV4OiAnMicsXG4gICAgICAgICAgICAnLmJvdHRvbSc6IHtcbiAgICAgICAgICAgICAgICB6SW5kZXg6ICcyJyxcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1PcmlnaW46ICd0b3AgY2VudGVyJyBcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH0sXG4gICAgICAgICcuYmVmb3JlJzoge1xuICAgICAgICAgICAgekluZGV4OiAnMycsXG4gICAgICAgICAgICAnLnRvcCc6IHtcbiAgICAgICAgICAgICAgICB6SW5kZXg6ICcyJyxcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1PcmlnaW46ICdib3R0b20gY2VudGVyJyxcbiAgICAgICAgICAgICAgICAnJjphZnRlcic6IHtcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCh0byBib3R0b20sIHJnYmEoMCwwLDAsLjEpIDAlLCByZ2JhKDAsMCwwLDEpIDEwMCUpJyBcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICcuYm90dG9tJzoge1xuICAgICAgICAgICAgICAgICcmOmFmdGVyJzoge1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgcmdiYSgwLDAsMCwxKSAwJSwgcmdiYSgwLDAsMCwuMSkgMTAwJSknIFxuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICB9IFxuICAgICAgICB9IFxuICAgIH0sXG4gICAgJ0BrZXlmcmFtZXMgZmxpcC1jbG9jay1pbmRleGluZyc6IHtcbiAgICAgICAgJzAlJzoge1xuICAgICAgICAgICAgekluZGV4OiAnMicgXG4gICAgICAgIH0sXG4gICAgICAgICcxJSc6IHtcbiAgICAgICAgICAgIHpJbmRleDogJzMnIFxuICAgICAgICB9LFxuICAgICAgICAnMTAwJSc6IHtcbiAgICAgICAgICAgIHpJbmRleDogJzQnIFxuICAgICAgICB9IFxuICAgIH0sXG4gICAgJ0BrZXlmcmFtZXMgZmxpcC1jbG9jay1ib3R0b20nOiB7XG4gICAgICAgICcwJSc6IHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZVgoOTBkZWcpJyBcbiAgICAgICAgfSxcbiAgICAgICAgJzEwMCUnOiB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06ICdyb3RhdGVYKDApJyBcbiAgICAgICAgfSBcbiAgICB9LFxuICAgICdAa2V5ZnJhbWVzIGZsaXAtY2xvY2stdG9wJzoge1xuICAgICAgICAnMCUnOiB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06ICdyb3RhdGVYKDApJyBcbiAgICAgICAgfSxcbiAgICAgICAgJzEwMCUnOiB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06ICdyb3RhdGVYKC05MGRlZyknIFxuICAgICAgICB9IFxuICAgIH0sXG4gICAgJ0BrZXlmcmFtZXMgZmxpcC1jbG9jay1zaG93LXNoYWRvdyc6IHtcbiAgICAgICAgJzAlJzoge1xuICAgICAgICAgICAgb3BhY2l0eTogJzAnIFxuICAgICAgICB9LFxuICAgICAgICAnMTAwJSc6IHtcbiAgICAgICAgICAgIG9wYWNpdHk6ICcxJyBcbiAgICAgICAgfSBcbiAgICB9LFxuICAgICdAa2V5ZnJhbWVzIGZsaXAtY2xvY2staGlkZS1zaGFkb3cnOiB7XG4gICAgICAgICcwJSc6IHtcbiAgICAgICAgICAgIG9wYWNpdHk6ICcxJyBcbiAgICAgICAgfSxcbiAgICAgICAgJzEwMCUnOiB7XG4gICAgICAgICAgICBvcGFjaXR5OiAnMCcgXG4gICAgICAgIH0gXG4gICAgfSBcbn0pO1xuICAgICJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFIsU0FBUyxhQUFBQSxrQkFBaUI7QUFDeFQsU0FBUyxXQUFBQyxnQkFBZTtBQUN4QixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7OztBQ0grUixTQUFTLGtCQUFrQjtBQUMxVSxTQUFTLE9BQU8sSUFBSSxpQkFBaUI7QUFDckMsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsZUFBMkI7QUFFcEMsSUFBTSxhQUF5QixJQUFJLFFBQVE7QUFBQSxFQUN2QyxrQkFBa0I7QUFDdEIsQ0FBQyxFQUFFLG9CQUFvQixtQkFBbUI7QUFFMUMsSUFBTSxVQUFVLFFBQVEsY0FBYztBQUV0QyxJQUFNLGFBQW9DO0FBQUEsRUFDeEMsdUJBQXVCO0FBQUEsRUFDdkIscUJBQXFCO0FBQUEsRUFDckIsb0JBQW9CO0FBQUEsRUFDcEIscUJBQXFCO0FBQUEsRUFDckIscUJBQXFCO0FBQUEsRUFDckIsdUJBQXVCO0FBQUEsRUFDdkIsd0JBQXdCO0FBQUEsRUFDeEIsd0JBQXdCO0FBQUEsRUFDeEIsdUJBQXVCO0FBQ3pCO0FBRUEsSUFBTSxnQkFBZ0I7QUFFdEIsSUFBTSxlQUFlO0FBRXJCLFNBQVMsUUFBNEIsT0FBVSxLQUFhO0FBQzFELFNBQU8sTUFDSixPQUFPLENBQUMsTUFBTSxRQUFRO0FBQ3JCLFFBQUcsSUFBSSxHQUFHLE1BQU07QUFBVyxhQUFPO0FBQ2xDLFdBQU8sT0FBTyxPQUFPLE1BQU0sRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBSSxPQUFPLEdBQUcsRUFBQyxDQUFDO0FBQUEsRUFDL0UsR0FBRyxDQUFDLENBQUM7QUFDVDtBQUVBLGVBQXNCLGVBQWU7QUFDbkMsTUFBRyxXQUFXLE9BQU8sR0FBRztBQUN0QixVQUFNLEdBQUcsU0FBUztBQUFBLE1BQ2hCLFdBQVc7QUFBQSxNQUNYLE9BQU87QUFBQSxJQUNULENBQUM7QUFBQSxFQUNIO0FBRUEsUUFBTSxNQUFNLE9BQU87QUFFbkIsYUFBVSxDQUFDLEtBQUssV0FBVyxLQUFLLFdBQVcsd0JBQXdCLEdBQUc7QUFDcEUsVUFBTSxlQUF1RSxDQUFDO0FBRTlFLGVBQVUsY0FBYyxhQUFhO0FBQ25DLFlBQU0sV0FBVyxXQUFXLFlBQVk7QUFFeEMsVUFBRyxhQUFhLHVCQUF1QjtBQUNyQztBQUFBLE1BQ0Y7QUFFQSxVQUFHLENBQUMsYUFBYSxRQUFRLEdBQUc7QUFDMUIscUJBQWEsUUFBUSxJQUFJLENBQUM7QUFBQSxNQUM1QjtBQUVBLFVBQUcsbUJBQW1CLFlBQVk7QUFDaEMsbUJBQVUsUUFBUSxXQUFXLGNBQWMsR0FBRztBQUM1QyxjQUFHLENBQUMsYUFBYSxLQUFLLFlBQVksQ0FBQyxHQUFHO0FBQ3BDLHlCQUFhLEtBQUssWUFBWSxDQUFDLElBQUksQ0FBQztBQUFBLFVBQ3RDO0FBRUEsdUJBQWEsS0FBSyxZQUFZLENBQUMsRUFBRSxLQUFLO0FBQUEsWUFDcEMsVUFBVSxHQUFHLEdBQUcsSUFBSSxLQUFLLFFBQVEsQ0FBQztBQUFBLFlBQ2xDLFVBQVUsS0FDUCxRQUFRLEVBQ1IsUUFBUSxlQUFlLEVBQUU7QUFBQSxVQUM5QixDQUFDO0FBQUEsUUFDSDtBQUFBLE1BQ0Y7QUFFQSxVQUFHLGdCQUFnQixZQUFZO0FBQzdCLG1CQUFVLFFBQVEsV0FBVyxXQUFXLEdBQUc7QUFDekMsY0FBRyxDQUFDLGFBQWEsS0FBSyxZQUFZLENBQUMsR0FBRztBQUNwQyx5QkFBYSxLQUFLLFlBQVksQ0FBQyxJQUFJLENBQUM7QUFBQSxVQUN0QztBQUVBLHVCQUFhLEtBQUssWUFBWSxDQUFDLEVBQUUsS0FBSztBQUFBLFlBQ3BDLFVBQVUsR0FBRyxHQUFHLElBQUksS0FBSyxRQUFRLENBQUM7QUFBQSxZQUNsQyxVQUFVLEtBQ1AsUUFBUSxFQUNSLFFBQVEsZUFBZSxFQUFFO0FBQUEsVUFDOUIsQ0FBQztBQUFBLFFBQ0g7QUFBQSxNQUNGO0FBRUEsbUJBQWEsUUFBUSxFQUFFLEtBQUs7QUFBQSxRQUMxQixVQUFVO0FBQUEsUUFDVixVQUFVLFdBQ1AsUUFBUSxFQUNSLFFBQVEsZUFBZSxFQUFFLEVBQ3pCLFFBQVEsY0FBYyxFQUFFLEVBQ3hCLEtBQUs7QUFBQSxNQUNWLENBQUM7QUFBQSxJQUNIO0FBRUEsZUFBVSxDQUFDLFVBQVUsS0FBSyxLQUFLLE9BQU8sUUFBUSxZQUFZLEdBQUc7QUFDM0QsWUFBTSxTQUFTLFFBQVEsT0FBTyxVQUFVO0FBRXhDLGlCQUFVLENBQUNDLE1BQUssS0FBSyxLQUFLLE9BQU8sUUFBUSxNQUFNLEdBQUc7QUFDaEQsY0FBTSxXQUFXLE1BQU0sSUFBSSxDQUFDLEVBQUUsVUFBQUMsVUFBUyxNQUFNQSxTQUFRLEVBQUUsS0FBSyxJQUFJO0FBQ2hFLGNBQU0sT0FBTyxRQUFRLFNBQVMsR0FBR0QsSUFBRyxHQUFHLFdBQVcsUUFBUSxLQUFLLEtBQUssRUFBRTtBQUV0RSxjQUFNLFVBQVUsTUFBTSxRQUFRO0FBQUEsTUFDaEM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGOzs7QUM5R3dULElBQUksa0JBQTBDO0FBcUMvVixTQUFTLGFBQWdCLGNBQXVDO0FBQ25FLE1BQUksUUFBcUI7QUFFekIsUUFBTSxjQUEwQixDQUFDO0FBRWpDLFdBQVMsT0FBTztBQUNaLFFBQUksaUJBQWlCO0FBQ2pCLGtCQUFZLEtBQUssZUFBZTtBQUFBLElBQ3BDO0FBRUEsV0FBTztBQUFBLEVBQ1g7QUFBQztBQUVELFdBQVMsTUFBTSxVQUFjO0FBQ3pCLFlBQVE7QUFFUixnQkFBWSxRQUFRLFFBQU0sR0FBRyxDQUFDO0FBQUEsRUFDbEM7QUFBQztBQUVELFdBQVMsUUFBUTtBQUNiLFlBQVE7QUFFUixnQkFBWSxPQUFPLEdBQUcsWUFBWSxNQUFNO0FBRXhDLFdBQU87QUFBQSxFQUNYO0FBQUM7QUFFRCxTQUFPLENBQUMsTUFBTSxPQUFPLEtBQUs7QUFDOUI7QUFPTyxTQUFTLFlBQVksVUFBc0I7QUFDOUMsb0JBQWtCO0FBQ2xCLFdBQVM7QUFDVCxvQkFBa0I7QUFDdEI7OztBQzVETyxTQUFTLElBQU8sT0FBNEI7QUFDL0MsUUFBTSxDQUFFLFVBQVUsUUFBUyxJQUFJLGFBQWEsS0FBSztBQUVqRCxTQUFPLElBQUksTUFBTSxFQUFFLE1BQU0sR0FBRztBQUFBLElBQ3hCLE1BQU07QUFDRixhQUFPLFNBQVM7QUFBQSxJQUNwQjtBQUFBLElBQ0EsSUFBSSxRQUFRLEdBQUdFLFFBQVU7QUFDckIsYUFBTyxRQUFRQTtBQUVmLGVBQVNBLE1BQUs7QUFFZCxhQUFPO0FBQUEsSUFDWDtBQUFBLEVBQ0osQ0FBQztBQUNMO0FBbUNPLFNBQVMsU0FBWSxJQUFpRDtBQUN6RSxTQUFPLE9BQU8sT0FBTyxhQUFhO0FBQUEsSUFDOUIsSUFBSSxRQUFRO0FBQ1IsYUFBTyxHQUFHO0FBQUEsSUFDZDtBQUFBLEVBQ0osSUFBSTtBQUFBLElBQ0EsSUFBSSxRQUFRO0FBQ1IsYUFBTyxHQUFHLElBQUk7QUFBQSxJQUNsQjtBQUFBLElBQ0EsSUFBSSxNQUFNLE9BQU87QUFDYixTQUFHLElBQUksS0FBSztBQUFBLElBQ2hCO0FBQUEsRUFDSjtBQUNKOzs7QUM3RE8sU0FBUyxRQUEwQjtBQUN0QyxRQUFNLFdBQVcsU0FBUyxjQUFjLHFCQUFxQjtBQUU3RCxNQUFJLFlBQVksb0JBQW9CLGtCQUFrQjtBQUNsRCxXQUFPO0FBQUEsRUFDWDtBQUVBLFFBQU0sS0FBSyxTQUFTLGNBQWMsT0FBTztBQUV6QyxLQUFHLEtBQUs7QUFFUixXQUFTLEtBQUssWUFBWSxFQUFFO0FBRTVCLFNBQU87QUFDWDtBQUtBLElBQU0sdUJBQStDLENBQUM7QUFLdEQsSUFBTSxrQkFBMEMsQ0FBQztBQU8xQyxTQUFTLFNBQVMsUUFBdUIsUUFBc0M7QUFDbEYsYUFBVyxPQUFPLFFBQVE7QUFDdEIsUUFBSSxPQUFPLE9BQU8sR0FBRyxNQUFNLFlBQVksT0FBTyxPQUFPLEdBQUcsTUFBTSxVQUFVO0FBQ3BFLGFBQU8sR0FBRyxJQUFJO0FBQUEsUUFDVixPQUFPLEdBQUc7QUFBQSxRQUNWLE9BQU8sR0FBRztBQUFBLE1BQ2Q7QUFBQSxJQUNKLE9BQU87QUFDSCxhQUFPLEdBQUcsSUFBSSxPQUFPLEdBQUc7QUFBQSxJQUM1QjtBQUFBLEVBQ0o7QUFFQSxTQUFPO0FBQ1g7QUFvQk8sU0FBUyxPQUFPLFFBQStCO0FBQ2xELFFBQU1DLE9BQU0sSUFBSSxNQUFNO0FBRXRCLFFBQU0sT0FBTyxTQUFTLE1BQU07QUFDeEIsVUFBTSxjQUFjLFVBQVVBLEtBQUksS0FBSztBQUV2QyxRQUFJLHFCQUFxQixXQUFXLEdBQUc7QUFDbkMsYUFBTyxxQkFBcUIsV0FBVztBQUFBLElBQzNDO0FBRUEsVUFBTUMsUUFBTyxPQUFPLFdBQVc7QUFFL0IseUJBQXFCLFdBQVcsSUFBSUE7QUFFcEMsV0FBT0E7QUFBQSxFQUNYLENBQUM7QUFFRCxjQUFZLE1BQU07QUFDZCxRQUFJLE9BQU8sYUFBYSxVQUFVO0FBQzlCLFVBQUksQ0FBQyxnQkFBZ0IsS0FBSyxLQUFLLEdBQUc7QUFDOUIsd0JBQWdCLEtBQUssS0FBSyxJQUFJLFFBQVFELEtBQUksT0FBTyxJQUFJLEtBQUssS0FBSyxFQUFFO0FBQUEsTUFDckU7QUFFQSxZQUFNLEVBQUUsWUFBWSxPQUFPLE9BQU8sZUFBZSxFQUFFLEtBQUssRUFBRTtBQUFBLElBQzlEO0FBQUEsRUFDSixDQUFDO0FBRUQsUUFBTSxVQUFrQjtBQUFBLElBQ3BCLEtBQUFBO0FBQUEsSUFDQTtBQUFBLElBQ0EsTUFBTSxRQUF1QjtBQUN6QixNQUFBQSxLQUFJLFFBQVEsU0FBU0EsS0FBSSxPQUFPLE1BQU07QUFFdEMsYUFBTztBQUFBLElBQ1g7QUFBQSxJQUNBLE9BQU8sUUFBdUI7QUFDMUIsYUFBTyxPQUFPLFNBQVNBLEtBQUksT0FBTyxNQUFNLENBQUM7QUFBQSxJQUM3QztBQUFBLElBQ0EsV0FBVztBQUNQLGFBQU8sZ0JBQWdCLEtBQUssS0FBSztBQUFBLElBQ3JDO0FBQUEsRUFDSjtBQUVBLFNBQU87QUFDWDtBQWlHTyxTQUFTLFFBQVEsS0FBVSxVQUEyQjtBQUN6RCxNQUFJLFFBQVE7QUFDWixNQUFJLFNBQVM7QUFDYixNQUFJLFVBQVU7QUFFZCxXQUFTLE9BQU8sS0FBSztBQUNqQixRQUFJLE1BQU0sSUFBSSxHQUFHO0FBRWpCLFFBQUksSUFBSSxDQUFDLEtBQUssS0FBSztBQUVmLFVBQUksSUFBSSxDQUFDLEtBQUssS0FBSztBQUVmLGdCQUFRLE1BQU0sTUFBTSxNQUFNO0FBQUEsTUFDOUIsV0FBVyxJQUFJLENBQUMsS0FBSyxLQUFLO0FBR3RCLGtCQUFVLFFBQVEsS0FBSyxHQUFHO0FBQUEsTUFDOUIsT0FBTztBQUVILGtCQUFVLE1BQU0sTUFBTSxRQUFRLEtBQUssSUFBSSxDQUFDLEtBQUssTUFBTSxLQUFLLFFBQVEsSUFBSTtBQUFBLE1BQ3hFO0FBQUEsSUFDSixXQUFXLE9BQU8sT0FBTyxVQUFVO0FBRS9CLGdCQUFVO0FBQUEsUUFDTjtBQUFBLFFBQ0E7QUFBQTtBQUFBLFVBRUksU0FBUyxRQUFRLFlBQVksQ0FBQyxRQUFRO0FBRWxDLG1CQUFPLElBQUksUUFBUSxtQkFBbUIsQ0FBQyxNQUFNO0FBRXpDLGtCQUFJLElBQUksS0FBSyxDQUFDO0FBQUcsdUJBQU8sRUFBRSxRQUFRLE1BQU0sR0FBRztBQUczQyxxQkFBTyxNQUFNLE1BQU0sTUFBTSxJQUFJO0FBQUEsWUFDakMsQ0FBQztBQUFBLFVBQ0wsQ0FBQztBQUFBLFlBQ0M7QUFBQSxNQUNWO0FBQUEsSUFDSixXQUFXLE9BQU8sUUFBVztBQUV6QixZQUFNLE1BQU0sS0FBSyxHQUFHLElBQUksTUFBTSxJQUFJLFFBQVEsVUFBVSxLQUFLLEVBQUUsWUFBWTtBQUV2RSxpQkFBVyxNQUFNLE1BQU0sTUFBTTtBQUFBLElBQ2pDO0FBQUEsRUFDSjtBQUdBLFNBQU8sU0FBUyxZQUFZLFVBQVUsV0FBVyxNQUFNLFVBQVUsTUFBTSxXQUFXO0FBQ3RGO0FBT08sU0FBUyxVQUFVLE1BQVc7QUFDakMsTUFBSSxPQUFPLFFBQVEsVUFBVTtBQUN6QixRQUFJLE1BQU07QUFDVixhQUFTLEtBQUs7QUFBTSxhQUFPLElBQUksVUFBVSxLQUFLLENBQUMsQ0FBQztBQUNoRCxXQUFPO0FBQUEsRUFDWCxPQUFPO0FBQ0gsV0FBTztBQUFBLEVBQ1g7QUFDSjtBQU9PLFNBQVMsT0FBTyxLQUFhO0FBQ2hDLE1BQUksSUFBSSxHQUNKLE1BQU07QUFDVixTQUFPLElBQUksSUFBSTtBQUFRLFVBQU8sTUFBTSxNQUFNLElBQUksV0FBVyxHQUFHLE1BQU87QUFDbkUsU0FBTyxPQUFPO0FBQ2xCOzs7QUNwU08sSUFBTSxNQUFNLE9BQU87QUFBQSxFQUN0QixnQkFBZ0I7QUFBQSxJQUNaLG1CQUFtQjtBQUFBLElBQ25CLFdBQVc7QUFBQSxJQUNYLFlBQVk7QUFBQSxJQUNaLFlBQVk7QUFBQSxJQUNaLFVBQVU7QUFBQSxJQUNWLFlBQVk7QUFBQSxJQUNaLFdBQVc7QUFBQSxJQUNYLFVBQVU7QUFBQSxJQUNWLE9BQU87QUFBQSxJQUNQLFNBQVM7QUFBQSxJQUNULFdBQVc7QUFBQSxJQUNYLFlBQVk7QUFBQSxJQUNaLEtBQUs7QUFBQSxFQUNUO0FBQUEsRUFDQSxxQkFBcUI7QUFBQSxJQUNqQixVQUFVO0FBQUEsSUFDVixjQUFjO0FBQUEsRUFDbEI7QUFBQSxFQUNBLHdCQUF3QjtBQUFBLElBQ3BCLFlBQVk7QUFBQSxJQUNaLEtBQUs7QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxJQUNQLGVBQWU7QUFBQSxJQUNmLFlBQVk7QUFBQSxJQUNaLFdBQVc7QUFBQSxFQUNmO0FBQUEsRUFDQSx1QkFBdUI7QUFBQSxJQUNuQixVQUFVO0FBQUEsSUFDVixTQUFTO0FBQUEsSUFDVCxZQUFZO0FBQUEsSUFDWixnQkFBZ0I7QUFBQSxJQUNoQixZQUFZO0FBQUEsSUFDWixPQUFPO0FBQUEsSUFDUCw2QkFBNkI7QUFBQSxNQUN6QixVQUFVO0FBQUEsSUFDZDtBQUFBLEVBQ0o7QUFBQSxFQUNBLHFCQUFxQjtBQUFBLElBQ2pCLFNBQVM7QUFBQSxJQUNULGVBQWU7QUFBQSxJQUNmLHVCQUF1QjtBQUFBLE1BQ25CLFlBQVk7QUFBQSxJQUNoQjtBQUFBLElBQ0EsMkJBQTJCO0FBQUEsTUFDdkIsU0FBUztBQUFBLE1BQ1QsWUFBWTtBQUFBLE1BQ1osS0FBSztBQUFBLElBQ1Q7QUFBQSxFQUNKO0FBQUEsRUFDQSxvQkFBb0I7QUFBQSxJQUNoQixPQUFPO0FBQUEsSUFDUCxRQUFRO0FBQUEsSUFDUixVQUFVO0FBQUEsSUFDVixjQUFjO0FBQUEsSUFDZCxXQUFXO0FBQUEsSUFDWCxZQUFZO0FBQUEsSUFDWixPQUFPO0FBQUEsSUFDUCxZQUFZO0FBQUEsSUFDWixtQkFBbUI7QUFBQSxNQUNmLHVDQUF1QztBQUFBLFFBQ25DLFFBQVE7QUFBQSxNQUNaO0FBQUEsTUFDQSwrQkFBK0I7QUFBQSxRQUMzQixpQkFBaUI7QUFBQSxVQUNiLFdBQVc7QUFBQSxZQUNQLFNBQVM7QUFBQSxVQUNiO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsSUFDQSwrQkFBK0I7QUFBQSxNQUMzQixVQUFVO0FBQUEsTUFDVixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixpQkFBaUI7QUFBQSxRQUNiLFFBQVE7QUFBQSxNQUNaO0FBQUEsTUFDQSxpQkFBaUI7QUFBQSxRQUNiLE9BQU87QUFBQSxRQUNQLFFBQVE7QUFBQSxRQUNSLFVBQVU7QUFBQSxRQUNWLFVBQVU7QUFBQSxRQUNWLFVBQVU7QUFBQSxRQUNWLFlBQVk7QUFBQSxRQUNaLFdBQVc7QUFBQSxRQUNYLFdBQVc7QUFBQSxVQUNQLFNBQVM7QUFBQSxVQUNULFNBQVM7QUFBQSxVQUNULFVBQVU7QUFBQSxVQUNWLEtBQUs7QUFBQSxVQUNMLE9BQU87QUFBQSxVQUNQLFFBQVE7QUFBQSxVQUNSLE1BQU07QUFBQSxVQUNOLFVBQVU7QUFBQSxRQUNkO0FBQUEsUUFDQSxZQUFZO0FBQUEsVUFDUixTQUFTO0FBQUEsVUFDVCxTQUFTO0FBQUEsVUFDVCxPQUFPO0FBQUEsVUFDUCxRQUFRO0FBQUEsVUFDUixVQUFVO0FBQUEsUUFDZDtBQUFBLE1BQ0o7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNKLGNBQWM7QUFBQSxRQUNkLFlBQVk7QUFBQSxRQUNaLFdBQVc7QUFBQSxVQUNQLGNBQWM7QUFBQSxRQUNsQjtBQUFBLFFBQ0EsWUFBWTtBQUFBLFVBQ1IsWUFBWTtBQUFBLFVBQ1osU0FBUztBQUFBLFVBQ1QsUUFBUTtBQUFBLFFBQ1o7QUFBQSxNQUNKO0FBQUEsTUFDQSxXQUFXO0FBQUEsUUFDUCxjQUFjO0FBQUEsUUFDZCxZQUFZO0FBQUEsUUFDWixXQUFXO0FBQUEsVUFDUCxjQUFjO0FBQUEsUUFDbEI7QUFBQSxRQUNBLFlBQVk7QUFBQSxVQUNSLFlBQVk7QUFBQSxVQUNaLFNBQVM7QUFBQSxRQUNiO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFBQSxJQUNBLGFBQWE7QUFBQSxNQUNULG1CQUFtQjtBQUFBLE1BQ25CLGdCQUFnQjtBQUFBLE1BQ2hCLCtCQUErQjtBQUFBLFFBQzNCLGFBQWE7QUFBQSxNQUNqQjtBQUFBLE1BQ0EsaUVBQWlFO0FBQUEsUUFDN0QsZ0JBQWdCO0FBQUEsUUFDaEIsbUJBQW1CO0FBQUEsUUFDbkIsbUJBQW1CO0FBQUEsUUFDbkIseUJBQXlCO0FBQUEsUUFDekIsV0FBVztBQUFBLFVBQ1AsbUJBQW1CO0FBQUEsVUFDbkIsbUJBQW1CO0FBQUEsUUFDdkI7QUFBQSxNQUNKO0FBQUEsTUFDQSxXQUFXO0FBQUEsUUFDUCxnQkFBZ0I7QUFBQSxRQUNoQix5QkFBeUI7QUFBQSxRQUN6QixRQUFRO0FBQUEsVUFDSixlQUFlO0FBQUEsUUFDbkI7QUFBQSxRQUNBLDZCQUE2QjtBQUFBLFVBQ3pCLGVBQWU7QUFBQSxRQUNuQjtBQUFBLE1BQ0o7QUFBQSxNQUNBLFdBQVc7QUFBQSxRQUNQLHlCQUF5QjtBQUFBLFFBQ3pCLFdBQVc7QUFBQSxVQUNQLGVBQWU7QUFBQSxRQUNuQjtBQUFBLFFBQ0EsNkJBQTZCO0FBQUEsVUFDekIsZUFBZTtBQUFBLFFBQ25CO0FBQUEsUUFDQSxXQUFXO0FBQUEsVUFDUCxlQUFlO0FBQUEsUUFDbkI7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBLElBQ0EsV0FBVztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsV0FBVztBQUFBLFFBQ1AsUUFBUTtBQUFBLFFBQ1IsaUJBQWlCO0FBQUEsTUFDckI7QUFBQSxJQUNKO0FBQUEsSUFDQSxXQUFXO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixRQUFRO0FBQUEsUUFDSixRQUFRO0FBQUEsUUFDUixpQkFBaUI7QUFBQSxRQUNqQixXQUFXO0FBQUEsVUFDUCxZQUFZO0FBQUEsUUFDaEI7QUFBQSxNQUNKO0FBQUEsTUFDQSxXQUFXO0FBQUEsUUFDUCxXQUFXO0FBQUEsVUFDUCxZQUFZO0FBQUEsUUFDaEI7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFBQSxFQUNBLGtDQUFrQztBQUFBLElBQzlCLE1BQU07QUFBQSxNQUNGLFFBQVE7QUFBQSxJQUNaO0FBQUEsSUFDQSxNQUFNO0FBQUEsTUFDRixRQUFRO0FBQUEsSUFDWjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ0osUUFBUTtBQUFBLElBQ1o7QUFBQSxFQUNKO0FBQUEsRUFDQSxnQ0FBZ0M7QUFBQSxJQUM1QixNQUFNO0FBQUEsTUFDRixXQUFXO0FBQUEsSUFDZjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ0osV0FBVztBQUFBLElBQ2Y7QUFBQSxFQUNKO0FBQUEsRUFDQSw2QkFBNkI7QUFBQSxJQUN6QixNQUFNO0FBQUEsTUFDRixXQUFXO0FBQUEsSUFDZjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ0osV0FBVztBQUFBLElBQ2Y7QUFBQSxFQUNKO0FBQUEsRUFDQSxxQ0FBcUM7QUFBQSxJQUNqQyxNQUFNO0FBQUEsTUFDRixTQUFTO0FBQUEsSUFDYjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ0osU0FBUztBQUFBLElBQ2I7QUFBQSxFQUNKO0FBQUEsRUFDQSxxQ0FBcUM7QUFBQSxJQUNqQyxNQUFNO0FBQUEsTUFDRixTQUFTO0FBQUEsSUFDYjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ0osU0FBUztBQUFBLElBQ2I7QUFBQSxFQUNKO0FBQ0osQ0FBQzs7O0FMblBELElBQU0sbUNBQW1DO0FBT3pDLElBQU0sZ0JBQWdCO0FBQUEsRUFDbEIsaUJBQWlCLElBQUksU0FBUztBQUNsQztBQUVBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLE9BQU87QUFBQSxJQUNILFFBQVE7QUFBQSxJQUNSLEtBQUs7QUFBQSxNQUNELE9BQU87QUFBQSxRQUNILFdBQVdFLFNBQVEsa0NBQVcsVUFBVTtBQUFBLE1BQzVDO0FBQUEsTUFDQSxTQUFTLENBQUMsTUFBTSxLQUFLO0FBQUEsTUFDckIsVUFBVSxDQUFDLFFBQVEsU0FBUztBQUN4QixlQUFPLEdBQUcsSUFBSSxJQUFJLE1BQU07QUFBQSxNQUM1QjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxJQUFJO0FBQUEsTUFDQSxhQUFhO0FBQUEsTUFDYixNQUFNLGFBQWE7QUFDZixjQUFNLGFBQWE7QUFFbkIsbUJBQVcsQ0FBQyxLQUFLLEtBQUssS0FBSyxPQUFPLFFBQVEsYUFBYSxHQUFHO0FBQ3RELGdCQUFNQyxXQUFVRCxTQUFRLFVBQVUsR0FBRyxFQUFFLEdBQUcsS0FBSztBQUFBLFFBQ25EO0FBQUEsTUFDSjtBQUFBLElBQ0osQ0FBQztBQUFBLEVBQ0w7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogWyJ3cml0ZUZpbGUiLCAicmVzb2x2ZSIsICJrZXkiLCAiY29udGVudHMiLCAidmFsdWUiLCAiY3NzIiwgImhhc2giLCAicmVzb2x2ZSIsICJ3cml0ZUZpbGUiXQp9Cg==
