import { PredicateList } from "nlptoolkit-propbank/dist/PredicateList.js";

export type PredicateEntry = {
  id: string;
  name: string;
  description: string;
  f: string;
  n: string;
};

const englishPropBank = new PredicateList();

export default defineEventHandler((event) => {
  const url = getRequestURL(event);

  if (url.pathname.endsWith("/PredicateSearch")) {
    const predicate = englishPropBank.getPredicate(url.searchParams.get("predicate"));
    const payload = [];

    if (predicate) {
      for (let i = 0; i < predicate.size(); i++) {
        const roleSet = predicate.getRoleSet(i);

        for (let j = 0; j < roleSet.size(); j++) {
          const role = roleSet.getRole(j);

          payload.push({
            id: roleSet.getId(),
            name: roleSet.getName(),
            description: role.getDescription(),
            f: role.getF(),
            n: role.getN(),
          });
        }
      }
    }

    return { payload: payload.length ? payload : null };
  } else if (url.pathname.endsWith("/RolesetIdSearch")) {
    const rolesetId = url.searchParams.get("rolesetId")
    const payload = [];

    for (const lemma of englishPropBank.getLemmaList()) {
      const predicate = englishPropBank.getPredicate(lemma);
      for (let i = 0; i < predicate.size(); i++) {
        const roleSet = predicate.getRoleSet(i);
        if (roleSet.getId() === rolesetId) {
          for (let j = 0; j < roleSet.size(); j++) {
            const role = roleSet.getRole(j);
            payload.push({
              id: roleSet.getId(),
              name: roleSet.getName(),
              description: role.getDescription(),
              f: role.getF(),
              n: role.getN(),
            });
          }
        }
      }
    }

    return { payload: payload.length ? payload : null };
  } else {
    return { payload: null };
  }
});
