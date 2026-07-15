export type DevOpsTool = {
  name: string;
  license: string;
  openSource: boolean;
  note?: string;
  description: string;
  url: string;
};

export type DevOpsCategory = {
  category: string;
  blurb: string;
  tools: DevOpsTool[];
};

export const devopsCatalog: DevOpsCategory[] = [
  {
    category: "IaaS / Self-Hosted Cloud",
    blurb: "Run your own private cloud instead of renting one.",
    tools: [
      { name: "OpenStack", license: "Apache-2.0", openSource: true, description: "The de-facto open source IaaS platform — compute, storage, and networking at scale.", url: "https://www.openstack.org/software/" },
      { name: "Proxmox VE", license: "AGPL-3.0", openSource: true, description: "Virtualization platform combining KVM and LXC with a built-in web UI.", url: "https://www.proxmox.com/en/proxmox-virtual-environment/get-started" },
      { name: "Apache CloudStack", license: "Apache-2.0", openSource: true, description: "Turnkey IaaS cloud orchestration, AWS-API compatible.", url: "https://cloudstack.apache.org/downloads.html" },
      { name: "OpenNebula", license: "Apache-2.0", openSource: true, description: "Simple, lightweight cloud and edge computing management platform.", url: "https://opennebula.io/download/" },
      { name: "Foreman", license: "GPL-3.0", openSource: true, description: "Lifecycle management for physical and virtual servers.", url: "https://theforeman.org/" },
    ],
  },
  {
    category: "Infrastructure as Code",
    blurb: "Provision infrastructure from declarative config.",
    tools: [
      { name: "OpenTofu", license: "MPL-2.0", openSource: true, description: "Community-driven, fully open source fork of Terraform.", url: "https://opentofu.org/docs/intro/install/" },
      { name: "Terraform", license: "BSL 1.1", openSource: false, note: "Not OSI-approved open source since v1.6 — see OpenTofu above for a fully open alternative.", description: "HashiCorp's original IaC tool for provisioning cloud resources.", url: "https://developer.hashicorp.com/terraform/install" },
      { name: "Pulumi", license: "Apache-2.0", openSource: true, description: "IaC using real programming languages (TypeScript, Python, Go).", url: "https://www.pulumi.com/docs/iac/download-install/" },
      { name: "Crossplane", license: "Apache-2.0", openSource: true, description: "Kubernetes-native infrastructure provisioning and control plane.", url: "https://docs.crossplane.io/latest/software/install/" },
    ],
  },
  {
    category: "Configuration Management",
    blurb: "Keep server/app configuration consistent at scale.",
    tools: [
      { name: "Ansible", license: "GPL-3.0", openSource: true, description: "Agentless automation for provisioning, config management, and app deployment.", url: "https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html" },
      { name: "Puppet (OSS)", license: "Apache-2.0", openSource: true, description: "Declarative config management with a mature module ecosystem.", url: "https://www.puppet.com/docs/puppet/8/install_puppet.html" },
      { name: "Chef Infra", license: "Apache-2.0", openSource: true, description: "Ruby-based infrastructure automation framework.", url: "https://www.chef.io/downloads" },
      { name: "Salt (SaltStack)", license: "Apache-2.0", openSource: true, description: "Event-driven config management and remote execution.", url: "https://docs.saltproject.io/en/latest/topics/installation/index.html" },
    ],
  },
  {
    category: "Containers & Runtime",
    blurb: "Build and run containers.",
    tools: [
      { name: "Docker Engine", license: "Apache-2.0", openSource: true, description: "The standard container runtime and build toolchain.", url: "https://docs.docker.com/engine/install/" },
      { name: "Podman", license: "Apache-2.0", openSource: true, description: "Daemonless, rootless container engine — drop-in Docker CLI compatible.", url: "https://podman.io/docs/installation" },
      { name: "containerd", license: "Apache-2.0", openSource: true, description: "Industry-standard container runtime used under Docker and Kubernetes.", url: "https://github.com/containerd/containerd/blob/main/docs/getting-started.md" },
      { name: "CRI-O", license: "Apache-2.0", openSource: true, description: "Lightweight container runtime built specifically for Kubernetes.", url: "https://github.com/cri-o/cri-o#getting-started" },
      { name: "Buildah", license: "Apache-2.0", openSource: true, description: "Build OCI container images without a daemon.", url: "https://buildah.io/" },
    ],
  },
  {
    category: "Container Orchestration",
    blurb: "Schedule and manage containers across clusters.",
    tools: [
      { name: "Kubernetes", license: "Apache-2.0", openSource: true, description: "The standard for container orchestration at scale.", url: "https://kubernetes.io/docs/tasks/tools/" },
      { name: "k3s", license: "Apache-2.0", openSource: true, description: "Lightweight Kubernetes distribution for edge and resource-constrained environments.", url: "https://docs.k3s.io/quick-start" },
      { name: "k0s", license: "Apache-2.0", openSource: true, description: "Zero-friction, single-binary Kubernetes distribution.", url: "https://docs.k0sproject.io/stable/install/" },
      { name: "MicroK8s", license: "Apache-2.0", openSource: true, description: "Canonical's minimal, snap-installable Kubernetes.", url: "https://microk8s.io/#install-microk8s" },
      { name: "Minikube / kind", license: "Apache-2.0", openSource: true, description: "Run a local single/multi-node Kubernetes cluster for development.", url: "https://kind.sigs.k8s.io/docs/user/quick-start/" },
      { name: "Rancher", license: "Apache-2.0", openSource: true, description: "Multi-cluster Kubernetes management platform.", url: "https://ranchermanager.docs.rancher.com/getting-started/installation-and-upgrade" },
    ],
  },
  {
    category: "CI (Continuous Integration)",
    blurb: "Automate builds, tests, and checks on every commit.",
    tools: [
      { name: "Jenkins", license: "MIT", openSource: true, description: "The original extensible self-hosted automation server.", url: "https://www.jenkins.io/download/" },
      { name: "Woodpecker CI", license: "Apache-2.0", openSource: true, description: "Community fork of Drone CI, lightweight container-native pipelines.", url: "https://woodpecker-ci.org/docs/next/installation/overview" },
      { name: "GitLab CE (CI/CD)", license: "MIT", openSource: true, description: "Self-hosted Git platform with built-in CI/CD pipelines.", url: "https://about.gitlab.com/install/" },
      { name: "Gitea Actions", license: "MIT", openSource: true, description: "GitHub Actions-compatible CI built into self-hosted Gitea.", url: "https://docs.gitea.com/usage/actions/overview" },
      { name: "Concourse CI", license: "Apache-2.0", openSource: true, description: "Pipeline-based CI/CD with a strong focus on reproducibility.", url: "https://concourse-ci.org/download.html" },
    ],
  },
  {
    category: "CD / GitOps",
    blurb: "Continuously deliver and sync deployments from Git.",
    tools: [
      { name: "Argo CD", license: "Apache-2.0", openSource: true, description: "Declarative GitOps continuous delivery for Kubernetes.", url: "https://argo-cd.readthedocs.io/en/stable/getting_started/" },
      { name: "Flux CD", license: "Apache-2.0", openSource: true, description: "GitOps toolkit that keeps clusters in sync with Git repos.", url: "https://fluxcd.io/flux/installation/" },
      { name: "Tekton", license: "Apache-2.0", openSource: true, description: "Kubernetes-native CI/CD building blocks and pipelines.", url: "https://tekton.dev/docs/installation/" },
      { name: "Spinnaker", license: "Apache-2.0", openSource: true, description: "Multi-cloud continuous delivery platform built at Netflix/Google.", url: "https://spinnaker.io/docs/setup/install/" },
      { name: "Argo Rollouts / Workflows", license: "Apache-2.0", openSource: true, description: "Progressive delivery (canary/blue-green) and workflow engines for Kubernetes.", url: "https://argoproj.github.io/" },
    ],
  },
  {
    category: "Artifact & Container Registries",
    blurb: "Store and distribute build artifacts and images.",
    tools: [
      { name: "Harbor", license: "Apache-2.0", openSource: true, description: "Container registry with vulnerability scanning and RBAC.", url: "https://goharbor.io/docs/main/install-config/" },
      { name: "Nexus Repository OSS", license: "EPL-1.0", openSource: true, description: "Universal artifact repository manager (Maven, npm, Docker, etc.).", url: "https://help.sonatype.com/repomanager3/product-information/download" },
      { name: "Docker Distribution", license: "Apache-2.0", openSource: true, description: "The open source implementation behind Docker Hub's registry protocol.", url: "https://distribution.github.io/distribution/" },
    ],
  },
  {
    category: "Monitoring",
    blurb: "Metrics, dashboards, and alerting.",
    tools: [
      { name: "Prometheus", license: "Apache-2.0", openSource: true, description: "Pull-based metrics collection and alerting, the CNCF standard.", url: "https://prometheus.io/download/" },
      { name: "Grafana", license: "AGPL-3.0", openSource: true, description: "Dashboards and visualization for metrics, logs, and traces.", url: "https://grafana.com/grafana/download" },
      { name: "VictoriaMetrics", license: "Apache-2.0", openSource: true, description: "High-performance, cost-efficient Prometheus-compatible time series DB.", url: "https://docs.victoriametrics.com/#how-to-install" },
      { name: "Zabbix", license: "GPL-2.0", openSource: true, description: "Enterprise-grade monitoring for networks, servers, and apps.", url: "https://www.zabbix.com/download" },
      { name: "Netdata", license: "GPL-3.0", openSource: true, description: "Real-time, per-second infrastructure monitoring.", url: "https://www.netdata.cloud/get-netdata/" },
    ],
  },
  {
    category: "Logging & Tracing",
    blurb: "Aggregate logs and trace requests across services.",
    tools: [
      { name: "Grafana Loki", license: "AGPL-3.0", openSource: true, description: "Log aggregation designed to work natively with Grafana.", url: "https://grafana.com/docs/loki/latest/setup/install/" },
      { name: "OpenSearch (+Dashboards)", license: "Apache-2.0", openSource: true, note: "Fully open source fork of Elasticsearch/Kibana after their license change.", description: "Search and log analytics engine with a Kibana-like UI.", url: "https://opensearch.org/downloads.html" },
      { name: "Fluentd / Fluent Bit", license: "Apache-2.0", openSource: true, description: "Unified logging layer for collecting and routing log data.", url: "https://fluentbit.io/download/" },
      { name: "Jaeger", license: "Apache-2.0", openSource: true, description: "Distributed tracing for microservices.", url: "https://www.jaegertracing.io/download/" },
      { name: "Graylog", license: "GPL/SSPL mix", openSource: true, description: "Centralized log management with search and alerting.", url: "https://www.graylog.org/downloads/" },
    ],
  },
  {
    category: "Secrets Management",
    blurb: "Store and inject credentials, keys, and certificates.",
    tools: [
      { name: "OpenBao", license: "MPL-2.0", openSource: true, description: "Linux Foundation-backed, fully open source fork of Vault.", url: "https://openbao.org/docs/install/" },
      { name: "HashiCorp Vault", license: "BSL 1.1", openSource: false, note: "Not OSI-approved open source since 2023 — see OpenBao above for a fully open alternative.", description: "Centralized secrets management, encryption as a service.", url: "https://developer.hashicorp.com/vault/install" },
      { name: "SOPS", license: "MPL-2.0", openSource: true, description: "Encrypts values in YAML/JSON/ENV files, Git-diff friendly.", url: "https://github.com/getsops/sops/releases" },
      { name: "External Secrets Operator", license: "Apache-2.0", openSource: true, description: "Syncs secrets from external APIs (Vault, AWS, GCP) into Kubernetes.", url: "https://external-secrets.io/latest/introduction/getting-started/" },
    ],
  },
  {
    category: "Service Mesh & Networking",
    blurb: "Traffic routing, load balancing, and service-to-service security.",
    tools: [
      { name: "Istio", license: "Apache-2.0", openSource: true, description: "Full-featured service mesh for traffic management and mTLS.", url: "https://istio.io/latest/docs/setup/getting-started/" },
      { name: "Linkerd", license: "Apache-2.0", openSource: true, description: "Lightweight, minimal-footprint service mesh for Kubernetes.", url: "https://linkerd.io/2/getting-started/" },
      { name: "Envoy", license: "Apache-2.0", openSource: true, description: "High-performance edge/service proxy powering most service meshes.", url: "https://www.envoyproxy.io/docs/envoy/latest/start/install" },
      { name: "Traefik", license: "MIT", openSource: true, description: "Cloud-native reverse proxy and load balancer with auto service discovery.", url: "https://doc.traefik.io/traefik/getting-started/install-traefik/" },
      { name: "HAProxy", license: "GPL-2.0", openSource: true, description: "Battle-tested TCP/HTTP load balancer.", url: "https://www.haproxy.org/#down" },
      { name: "Caddy", license: "Apache-2.0", openSource: true, description: "Web server with automatic HTTPS by default.", url: "https://caddyserver.com/download" },
    ],
  },
  {
    category: "Load Testing",
    blurb: "Simulate traffic and measure performance under load.",
    tools: [
      { name: "k6", license: "AGPL-3.0", openSource: true, description: "Developer-centric load testing, scripted in JavaScript.", url: "https://grafana.com/docs/k6/latest/set-up/install-k6/" },
      { name: "Apache JMeter", license: "Apache-2.0", openSource: true, description: "The long-standing GUI-driven load and functional testing tool.", url: "https://jmeter.apache.org/download_jmeter.cgi" },
      { name: "Locust", license: "MIT", openSource: true, description: "Python-scripted, distributed load testing.", url: "https://docs.locust.io/en/stable/installation.html" },
    ],
  },
  {
    category: "Self-Hosted Git",
    blurb: "Host your own Git repos and code review.",
    tools: [
      { name: "GitLab CE", license: "MIT", openSource: true, description: "Full DevOps platform: repos, CI/CD, issues, container registry.", url: "https://about.gitlab.com/install/" },
      { name: "Gitea", license: "MIT", openSource: true, description: "Lightweight, fast, single-binary self-hosted Git service.", url: "https://about.gitea.com/products/gitea" },
      { name: "Forgejo", license: "MIT", openSource: true, description: "Community-driven, fully open source fork of Gitea.", url: "https://forgejo.org/download/" },
    ],
  },
];
