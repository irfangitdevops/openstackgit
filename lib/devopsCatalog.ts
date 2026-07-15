export type DevOpsTool = {
  name: string;
  slug: string;
  license: string;
  openSource: boolean;
  note?: string;
  description: string;
  url: string;
  /** GitHub "owner/repo" for fetching live release history. Omit if not on GitHub. */
  repo?: string;
  /** Prerendered at build time (high-traffic tools). Others render on-demand via ISR. */
  featured?: boolean;
};

export type DevOpsCategory = {
  category: string;
  slug: string;
  blurb: string;
  tools: DevOpsTool[];
};

export const devopsCatalog: DevOpsCategory[] = [
  {
    category: "IaaS / Self-Hosted Cloud",
    slug: "iaas",
    blurb: "Run your own private cloud instead of renting one.",
    tools: [
      { name: "OpenStack", slug: "openstack", license: "Apache-2.0", openSource: true, description: "The de-facto open source IaaS platform — compute, storage, and networking at scale.", url: "https://www.openstack.org/software/" },
      { name: "Proxmox VE", slug: "proxmox-ve", license: "AGPL-3.0", openSource: true, description: "Virtualization platform combining KVM and LXC with a built-in web UI.", url: "https://www.proxmox.com/en/proxmox-virtual-environment/get-started" },
      { name: "Apache CloudStack", slug: "cloudstack", license: "Apache-2.0", openSource: true, description: "Turnkey IaaS cloud orchestration, AWS-API compatible.", url: "https://cloudstack.apache.org/downloads.html", repo: "apache/cloudstack" },
      { name: "OpenNebula", slug: "opennebula", license: "Apache-2.0", openSource: true, description: "Simple, lightweight cloud and edge computing management platform.", url: "https://opennebula.io/download/", repo: "OpenNebula/one" },
      { name: "Foreman", slug: "foreman", license: "GPL-3.0", openSource: true, description: "Lifecycle management for physical and virtual servers.", url: "https://theforeman.org/", repo: "theforeman/foreman" },
    ],
  },
  {
    category: "Infrastructure as Code",
    slug: "infrastructure-as-code",
    blurb: "Provision infrastructure from declarative config.",
    tools: [
      { name: "OpenTofu", slug: "opentofu", license: "MPL-2.0", openSource: true, featured: true, description: "Community-driven, fully open source fork of Terraform.", url: "https://opentofu.org/docs/intro/install/", repo: "opentofu/opentofu" },
      { name: "Terraform", slug: "terraform", license: "BSL 1.1", openSource: false, featured: true, note: "Not OSI-approved open source since v1.6 — see OpenTofu above for a fully open alternative.", description: "HashiCorp's original IaC tool for provisioning cloud resources.", url: "https://developer.hashicorp.com/terraform/install", repo: "hashicorp/terraform" },
      { name: "Pulumi", slug: "pulumi", license: "Apache-2.0", openSource: true, description: "IaC using real programming languages (TypeScript, Python, Go).", url: "https://www.pulumi.com/docs/iac/download-install/", repo: "pulumi/pulumi" },
      { name: "Crossplane", slug: "crossplane", license: "Apache-2.0", openSource: true, description: "Kubernetes-native infrastructure provisioning and control plane.", url: "https://docs.crossplane.io/latest/software/install/", repo: "crossplane/crossplane" },
    ],
  },
  {
    category: "Configuration Management",
    slug: "configuration-management",
    blurb: "Keep server/app configuration consistent at scale.",
    tools: [
      { name: "Ansible", slug: "ansible", license: "GPL-3.0", openSource: true, featured: true, description: "Agentless automation for provisioning, config management, and app deployment.", url: "https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html", repo: "ansible/ansible" },
      { name: "Puppet (OSS)", slug: "puppet", license: "Apache-2.0", openSource: true, description: "Declarative config management with a mature module ecosystem.", url: "https://www.puppet.com/docs/puppet/8/install_puppet.html", repo: "puppetlabs/puppet" },
      { name: "Chef Infra", slug: "chef-infra", license: "Apache-2.0", openSource: true, description: "Ruby-based infrastructure automation framework.", url: "https://www.chef.io/downloads", repo: "chef/chef" },
      { name: "Salt (SaltStack)", slug: "salt", license: "Apache-2.0", openSource: true, description: "Event-driven config management and remote execution.", url: "https://docs.saltproject.io/en/latest/topics/installation/index.html", repo: "saltstack/salt" },
    ],
  },
  {
    category: "Containers & Runtime",
    slug: "containers-runtime",
    blurb: "Build and run containers.",
    tools: [
      { name: "Docker Engine", slug: "docker-engine", license: "Apache-2.0", openSource: true, featured: true, description: "The standard container runtime and build toolchain.", url: "https://docs.docker.com/engine/install/", repo: "moby/moby" },
      { name: "Podman", slug: "podman", license: "Apache-2.0", openSource: true, featured: true, description: "Daemonless, rootless container engine — drop-in Docker CLI compatible.", url: "https://podman.io/docs/installation", repo: "containers/podman" },
      { name: "containerd", slug: "containerd", license: "Apache-2.0", openSource: true, description: "Industry-standard container runtime used under Docker and Kubernetes.", url: "https://github.com/containerd/containerd/blob/main/docs/getting-started.md", repo: "containerd/containerd" },
      { name: "CRI-O", slug: "cri-o", license: "Apache-2.0", openSource: true, description: "Lightweight container runtime built specifically for Kubernetes.", url: "https://github.com/cri-o/cri-o#getting-started", repo: "cri-o/cri-o" },
      { name: "Buildah", slug: "buildah", license: "Apache-2.0", openSource: true, description: "Build OCI container images without a daemon.", url: "https://buildah.io/", repo: "containers/buildah" },
    ],
  },
  {
    category: "Container Orchestration",
    slug: "orchestration",
    blurb: "Schedule and manage containers across clusters.",
    tools: [
      { name: "Kubernetes", slug: "kubernetes", license: "Apache-2.0", openSource: true, featured: true, description: "The standard for container orchestration at scale.", url: "https://kubernetes.io/docs/tasks/tools/", repo: "kubernetes/kubernetes" },
      { name: "k3s", slug: "k3s", license: "Apache-2.0", openSource: true, description: "Lightweight Kubernetes distribution for edge and resource-constrained environments.", url: "https://docs.k3s.io/quick-start", repo: "k3s-io/k3s" },
      { name: "k0s", slug: "k0s", license: "Apache-2.0", openSource: true, description: "Zero-friction, single-binary Kubernetes distribution.", url: "https://docs.k0sproject.io/stable/install/", repo: "k0sproject/k0s" },
      { name: "MicroK8s", slug: "microk8s", license: "Apache-2.0", openSource: true, description: "Canonical's minimal, snap-installable Kubernetes.", url: "https://microk8s.io/#install-microk8s", repo: "canonical/microk8s" },
      { name: "Minikube / kind", slug: "minikube-kind", license: "Apache-2.0", openSource: true, description: "Run a local single/multi-node Kubernetes cluster for development.", url: "https://kind.sigs.k8s.io/docs/user/quick-start/", repo: "kubernetes/minikube" },
      { name: "Rancher", slug: "rancher", license: "Apache-2.0", openSource: true, description: "Multi-cluster Kubernetes management platform.", url: "https://ranchermanager.docs.rancher.com/getting-started/installation-and-upgrade", repo: "rancher/rancher" },
    ],
  },
  {
    category: "CI (Continuous Integration)",
    slug: "ci",
    blurb: "Automate builds, tests, and checks on every commit.",
    tools: [
      { name: "Jenkins", slug: "jenkins", license: "MIT", openSource: true, featured: true, description: "The original extensible self-hosted automation server.", url: "https://www.jenkins.io/download/", repo: "jenkinsci/jenkins" },
      { name: "Woodpecker CI", slug: "woodpecker-ci", license: "Apache-2.0", openSource: true, description: "Community fork of Drone CI, lightweight container-native pipelines.", url: "https://woodpecker-ci.org/docs/next/installation/overview", repo: "woodpecker-ci/woodpecker" },
      { name: "GitLab CE (CI/CD)", slug: "gitlab-ce", license: "MIT", openSource: true, description: "Self-hosted Git platform with built-in CI/CD pipelines.", url: "https://about.gitlab.com/install/" },
      { name: "Gitea Actions", slug: "gitea-actions", license: "MIT", openSource: true, description: "GitHub Actions-compatible CI built into self-hosted Gitea.", url: "https://docs.gitea.com/usage/actions/overview", repo: "go-gitea/gitea" },
      { name: "Concourse CI", slug: "concourse-ci", license: "Apache-2.0", openSource: true, description: "Pipeline-based CI/CD with a strong focus on reproducibility.", url: "https://concourse-ci.org/download.html", repo: "concourse/concourse" },
    ],
  },
  {
    category: "CD / GitOps",
    slug: "cd-gitops",
    blurb: "Continuously deliver and sync deployments from Git.",
    tools: [
      { name: "Argo CD", slug: "argo-cd", license: "Apache-2.0", openSource: true, featured: true, description: "Declarative GitOps continuous delivery for Kubernetes.", url: "https://argo-cd.readthedocs.io/en/stable/getting_started/", repo: "argoproj/argo-cd" },
      { name: "Flux CD", slug: "flux-cd", license: "Apache-2.0", openSource: true, description: "GitOps toolkit that keeps clusters in sync with Git repos.", url: "https://fluxcd.io/flux/installation/", repo: "fluxcd/flux2" },
      { name: "Tekton", slug: "tekton", license: "Apache-2.0", openSource: true, description: "Kubernetes-native CI/CD building blocks and pipelines.", url: "https://tekton.dev/docs/installation/", repo: "tektoncd/pipeline" },
      { name: "Spinnaker", slug: "spinnaker", license: "Apache-2.0", openSource: true, description: "Multi-cloud continuous delivery platform built at Netflix/Google.", url: "https://spinnaker.io/docs/setup/install/", repo: "spinnaker/spinnaker" },
      { name: "Argo Rollouts / Workflows", slug: "argo-rollouts-workflows", license: "Apache-2.0", openSource: true, description: "Progressive delivery (canary/blue-green) and workflow engines for Kubernetes.", url: "https://argoproj.github.io/", repo: "argoproj/argo-rollouts" },
    ],
  },
  {
    category: "Artifact & Container Registries",
    slug: "registries",
    blurb: "Store and distribute build artifacts and images.",
    tools: [
      { name: "Harbor", slug: "harbor", license: "Apache-2.0", openSource: true, description: "Container registry with vulnerability scanning and RBAC.", url: "https://goharbor.io/docs/main/install-config/", repo: "goharbor/harbor" },
      { name: "Nexus Repository OSS", slug: "nexus-oss", license: "EPL-1.0", openSource: true, description: "Universal artifact repository manager (Maven, npm, Docker, etc.).", url: "https://help.sonatype.com/repomanager3/product-information/download" },
      { name: "Docker Distribution", slug: "docker-distribution", license: "Apache-2.0", openSource: true, description: "The open source implementation behind Docker Hub's registry protocol.", url: "https://distribution.github.io/distribution/", repo: "distribution/distribution" },
    ],
  },
  {
    category: "Monitoring",
    slug: "monitoring",
    blurb: "Metrics, dashboards, and alerting.",
    tools: [
      { name: "Prometheus", slug: "prometheus", license: "Apache-2.0", openSource: true, featured: true, description: "Pull-based metrics collection and alerting, the CNCF standard.", url: "https://prometheus.io/download/", repo: "prometheus/prometheus" },
      { name: "Grafana", slug: "grafana", license: "AGPL-3.0", openSource: true, featured: true, description: "Dashboards and visualization for metrics, logs, and traces.", url: "https://grafana.com/grafana/download", repo: "grafana/grafana" },
      { name: "VictoriaMetrics", slug: "victoriametrics", license: "Apache-2.0", openSource: true, description: "High-performance, cost-efficient Prometheus-compatible time series DB.", url: "https://docs.victoriametrics.com/#how-to-install", repo: "VictoriaMetrics/VictoriaMetrics" },
      { name: "Zabbix", slug: "zabbix", license: "GPL-2.0", openSource: true, description: "Enterprise-grade monitoring for networks, servers, and apps.", url: "https://www.zabbix.com/download", repo: "zabbix/zabbix" },
      { name: "Netdata", slug: "netdata", license: "GPL-3.0", openSource: true, description: "Real-time, per-second infrastructure monitoring.", url: "https://www.netdata.cloud/get-netdata/", repo: "netdata/netdata" },
    ],
  },
  {
    category: "Logging & Tracing",
    slug: "logging-tracing",
    blurb: "Aggregate logs and trace requests across services.",
    tools: [
      { name: "Grafana Loki", slug: "loki", license: "AGPL-3.0", openSource: true, description: "Log aggregation designed to work natively with Grafana.", url: "https://grafana.com/docs/loki/latest/setup/install/", repo: "grafana/loki" },
      { name: "OpenSearch (+Dashboards)", slug: "opensearch", license: "Apache-2.0", openSource: true, note: "Fully open source fork of Elasticsearch/Kibana after their license change.", description: "Search and log analytics engine with a Kibana-like UI.", url: "https://opensearch.org/downloads.html", repo: "opensearch-project/OpenSearch" },
      { name: "Fluentd / Fluent Bit", slug: "fluentd-fluent-bit", license: "Apache-2.0", openSource: true, description: "Unified logging layer for collecting and routing log data.", url: "https://fluentbit.io/download/", repo: "fluent/fluentd" },
      { name: "Jaeger", slug: "jaeger", license: "Apache-2.0", openSource: true, description: "Distributed tracing for microservices.", url: "https://www.jaegertracing.io/download/", repo: "jaegertracing/jaeger" },
      { name: "Graylog", slug: "graylog", license: "GPL/SSPL mix", openSource: true, description: "Centralized log management with search and alerting.", url: "https://www.graylog.org/downloads/", repo: "Graylog2/graylog2-server" },
    ],
  },
  {
    category: "Secrets Management",
    slug: "secrets",
    blurb: "Store and inject credentials, keys, and certificates.",
    tools: [
      { name: "OpenBao", slug: "openbao", license: "MPL-2.0", openSource: true, featured: true, description: "Linux Foundation-backed, fully open source fork of Vault.", url: "https://openbao.org/docs/install/", repo: "openbao/openbao" },
      { name: "HashiCorp Vault", slug: "vault", license: "BSL 1.1", openSource: false, featured: true, note: "Not OSI-approved open source since 2023 — see OpenBao above for a fully open alternative.", description: "Centralized secrets management, encryption as a service.", url: "https://developer.hashicorp.com/vault/install", repo: "hashicorp/vault" },
      { name: "SOPS", slug: "sops", license: "MPL-2.0", openSource: true, description: "Encrypts values in YAML/JSON/ENV files, Git-diff friendly.", url: "https://github.com/getsops/sops/releases", repo: "getsops/sops" },
      { name: "External Secrets Operator", slug: "external-secrets", license: "Apache-2.0", openSource: true, description: "Syncs secrets from external APIs (Vault, AWS, GCP) into Kubernetes.", url: "https://external-secrets.io/latest/introduction/getting-started/", repo: "external-secrets/external-secrets" },
    ],
  },
  {
    category: "Service Mesh & Networking",
    slug: "service-mesh-networking",
    blurb: "Traffic routing, load balancing, and service-to-service security.",
    tools: [
      { name: "Istio", slug: "istio", license: "Apache-2.0", openSource: true, description: "Full-featured service mesh for traffic management and mTLS.", url: "https://istio.io/latest/docs/setup/getting-started/", repo: "istio/istio" },
      { name: "Linkerd", slug: "linkerd", license: "Apache-2.0", openSource: true, description: "Lightweight, minimal-footprint service mesh for Kubernetes.", url: "https://linkerd.io/2/getting-started/", repo: "linkerd/linkerd2" },
      { name: "Envoy", slug: "envoy", license: "Apache-2.0", openSource: true, description: "High-performance edge/service proxy powering most service meshes.", url: "https://www.envoyproxy.io/docs/envoy/latest/start/install", repo: "envoyproxy/envoy" },
      { name: "Traefik", slug: "traefik", license: "MIT", openSource: true, featured: true, description: "Cloud-native reverse proxy and load balancer with auto service discovery.", url: "https://doc.traefik.io/traefik/getting-started/install-traefik/", repo: "traefik/traefik" },
      { name: "HAProxy", slug: "haproxy", license: "GPL-2.0", openSource: true, description: "Battle-tested TCP/HTTP load balancer.", url: "https://www.haproxy.org/#down", repo: "haproxy/haproxy" },
      { name: "Caddy", slug: "caddy", license: "Apache-2.0", openSource: true, description: "Web server with automatic HTTPS by default.", url: "https://caddyserver.com/download", repo: "caddyserver/caddy" },
    ],
  },
  {
    category: "Load Testing",
    slug: "load-testing",
    blurb: "Simulate traffic and measure performance under load.",
    tools: [
      { name: "k6", slug: "k6", license: "AGPL-3.0", openSource: true, description: "Developer-centric load testing, scripted in JavaScript.", url: "https://grafana.com/docs/k6/latest/set-up/install-k6/", repo: "grafana/k6" },
      { name: "Apache JMeter", slug: "jmeter", license: "Apache-2.0", openSource: true, description: "The long-standing GUI-driven load and functional testing tool.", url: "https://jmeter.apache.org/download_jmeter.cgi", repo: "apache/jmeter" },
      { name: "Locust", slug: "locust", license: "MIT", openSource: true, description: "Python-scripted, distributed load testing.", url: "https://docs.locust.io/en/stable/installation.html", repo: "locustio/locust" },
    ],
  },
  {
    category: "Self-Hosted Git",
    slug: "self-hosted-git",
    blurb: "Host your own Git repos and code review.",
    tools: [
      { name: "GitLab CE", slug: "gitlab-ce", license: "MIT", openSource: true, description: "Full DevOps platform: repos, CI/CD, issues, container registry.", url: "https://about.gitlab.com/install/" },
      { name: "Gitea", slug: "gitea", license: "MIT", openSource: true, description: "Lightweight, fast, single-binary self-hosted Git service.", url: "https://about.gitea.com/products/gitea", repo: "go-gitea/gitea" },
      { name: "Forgejo", slug: "forgejo", license: "MIT", openSource: true, description: "Community-driven, fully open source fork of Gitea.", url: "https://forgejo.org/download/" },
    ],
  },
];

export function findCategory(categorySlug: string): DevOpsCategory | undefined {
  return devopsCatalog.find((c) => c.slug === categorySlug);
}

export function findTool(
  categorySlug: string,
  toolSlug: string
): { category: DevOpsCategory; tool: DevOpsTool } | undefined {
  const category = findCategory(categorySlug);
  const tool = category?.tools.find((t) => t.slug === toolSlug);
  if (!category || !tool) return undefined;
  return { category, tool };
}

/** Flattened [categorySlug, toolSlug] pairs for static generation. */
export function allToolParams(): { category: string; tool: string }[] {
  return devopsCatalog.flatMap((c) => c.tools.map((t) => ({ category: c.slug, tool: t.slug })));
}

export function featuredToolParams(): { category: string; tool: string }[] {
  return devopsCatalog.flatMap((c) =>
    c.tools.filter((t) => t.featured).map((t) => ({ category: c.slug, tool: t.slug }))
  );
}
