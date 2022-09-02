# ged2dot.js

Convert GEDCOM to GraphViz dot notation. 

Parses a GEDCOM database into a graph, performs breadth-first traversal to build a subgraph, outputs GraphViz dot notation.

## API

 - ged2dot(ged, rootfamily, familydepth) - start from `rootfamily` and traverse up to `familydepth`
 - ged2dot_(ged) - start from `F1` family and traverse up to `4` depth

family and person nodes in the exported graph are interactive, but the user is expected to declare and implement the corresponding setters:

  - `window.ged2dot_setFamilyID`: _UID of a family node
  - `window.ged2dot_setPersonREFN`: _REFN of a person node
  - `window.ged2dot_setPersonUUID`: _UID of a person node
  
## React+TypeScript example

```typescript
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { graphviz } from "@hpcc-js/wasm";

const ged = `
0 HEAD
1 GEDC
2 VERS 5.5.1
2 FORM LINEAGE-LINKED
1 CHAR UTF-8
0 @I0001@ INDI
1 NAME William /Shakespeare/
2 GIVN William
2 SURN Shakespeare
1 SEX M
1 BIRT
2 DATE BEF 23 APR 1564
2 PLAC Stratford-upon-Avon
1 DEAT
2 DATE 23 APR 1616
1 _UID A97E375D-4E76-4C50-AADD-DEB6D45C4FFD
0 TRLR`;

const FamilyIDControl = () => {
  const [html, setHtml] = useState("");
  const [familyID, setFamilyID] = useState("F0001");
  const navigate = useNavigate();

  const render = async (_familyID: any = familyID) => {
    const dot = ged2dot(ged, _familyID, 10);
    const svg = await graphviz.layout(dot, "svg", "dot");
    setHtml(svg);
  };

  useEffect(() => {
    window.ged2dot_setFamilyID = (id: string) => {
      setFamilyID(id);
    };
    window.ged2dot_setPersonREFN = (refn: string) => {
      navigate(`search?refn=${refn}`);
    };
    window.ged2dot_setPersonUUID = (uuid: string) => {
      navigate(`search?uuid=${uuid}`);
    };
  }, []);

  return (
    <>
      <div
        className={styles.csv}
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
      <input
        type="text"
        value={familyID}
        onChange={async (e: any) => {
          setFamilyID(e.target.value);
          await render(e.target.value);
        }}
      />
    </>
  );
};
```
